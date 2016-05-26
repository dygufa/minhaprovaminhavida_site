module.exports = function(sequelize, DataTypes) {
	var File = sequelize.define('file', {
		name: DataTypes.STRING,
		file: DataTypes.STRING,
		status: DataTypes.INTEGER,
		type: DataTypes.INTEGER
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