module.exports = function(sequelize, DataTypes) {
	var File = sequelize.define('File', {
		name: DataTypes.STRING,
		course: DataTypes.STRING,
		professor: DataTypes.STRING,
		file: DataTypes.STRING
	});

	return File;
}