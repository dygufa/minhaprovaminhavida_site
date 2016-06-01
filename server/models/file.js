module.exports = function(sequelize, DataTypes) {
	var File = sequelize.define('file', {
		name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 30],
                    msg: 'The name must be more than 5 characters and less than 30.'
                }
            }
        },
		file: DataTypes.STRING,
        file_raw: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                validFile: function(files, next) {
                    return next();
                    if (files.length > 1) {
                        return next('Upload just one file.');
                    }
                    next('teste');
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