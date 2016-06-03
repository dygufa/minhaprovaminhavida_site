var mime        = require('mime-types'),
    filesize    = require('file-size');

var MAX_SIMULTANEOUS_FILES = 1,
    MAX_FILE_SIZE_MB = 2,
    ACCEPTED_FILE_EXTENSIONS = ['pdf'];

module.exports = function(sequelize, DataTypes) {
	var File = sequelize.define('file', {
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 30],
                    msg: 'O nome do arquivo deve ter entre 5 e 30 caracteres.'
                }
            }
        },
		file: DataTypes.STRING,
        file_raw: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                numberOfFiles: function(files, next) {
                    if (!Array.isArray(files) || files.length == 0) {
                        return next('Por favor, selecione um arquivo!');
                    }

                    if (files.length > MAX_SIMULTANEOUS_FILES) {
                        if (MAX_SIMULTANEOUS_FILES == 1) {
                            return next('Envia apenas um arquivo por vez!');
                        }

                        return next('Envie no máximo ' + MAX_SIMULTANEOUS_FILES + ' arquivos por vez.');
                    }

                    return next();
                },
                extensionOfFiles: function(files, next) {
                    if (!Array.isArray(files) || 
                        files.length == 0 || 
                        files.length > MAX_SIMULTANEOUS_FILES) {
                        return next();
                    }

                    var invalidFiles = [];

                    for (var i = 0; i < files.length; i++) {
                        if (files[i].mimetype === undefined ||
                            ACCEPTED_FILE_EXTENSIONS.indexOf(mime.extension(files[i].mimetype))) {
                            console.log(files[i], mime.extension(files[i].mimetype));
                            invalidFiles.push(files[i].originalname);
                        }
                    }

                    if (invalidFiles.length == 1) {
                        return next('Arquivo inválido. O arquivo deve estar no formato pdf.');
                    } else if (invalidFiles.length > 1) {
                        return next('Os seguintes arquivos são inválidos: ' + invalidFiles.join(', ') + '. Os arquivos devem estar no formato pdf.');
                    }                    

                    return next();
                },
                sizeOfFiles: function(files, next) {
                    if (!Array.isArray(files) || 
                        files.length == 0 || 
                        files.length > MAX_SIMULTANEOUS_FILES) {
                        return next();
                    }

                    var invalidFiles = [];

                    for (var i = 0; i < files.length; i++) {
                        if (files[i].size === undefined ||
                            filesize(files[i].size).to('MB') > MAX_FILE_SIZE_MB) {
                            invalidFiles.push(files[i].originalname);
                        }
                    }

                    if (invalidFiles.length == 1) {
                        return next('Arquivo muito grande. O arquivo deve ter no máximo ' + MAX_FILE_SIZE_MB + ' MBs.');
                    } else if (invalidFiles.length > 1) {
                        return next('Os seguintes arquivos são muito grandes: ' + invalidFiles.join(', ') + '. Os arquivos devem ter no máximo ' + MAX_FILE_SIZE_MB + ' MBs.');
                    }                    

                    return next();
                }
            }
        },
		status: DataTypes.INTEGER,
        createdBy: DataTypes.INTEGER,
		type: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                isIn: [[1, 2]]
            }
        },
        courseId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                courseExists: function(value, next) {
                    sequelize.models.course.find({
                        where: {
                            id: value
                        }
                    }).then(function(course) {
                        if (course) {
                            next();
                        } else {
                            next('Invalid course ID.');
                        }
                    }).catch(function(err) {
                        next(err);
                    });                    
                }
            }
        },
        universityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                universityExists: function(value, next) {
                    sequelize.models.university.find({
                        where: {
                            id: value
                        }
                    }).then(function(university) {
                        if (university) {
                            next();
                        } else {
                            next('Invalid university ID.');
                        }
                    }).catch(function(err) {
                        next(err);
                    });                    
                }
            }
        }
	}, {
        classMethods: {
            associate: function(models) {
            	File.belongsTo(models.user, { foreignKey: 'createdBy' });
                File.belongsTo(models.course, { foreignKey: 'courseId' });
                File.belongsTo(models.university, { foreignKey: 'universityId' });
            }
        }
    });

	return File;
}