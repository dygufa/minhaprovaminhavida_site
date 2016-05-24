module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define('course', {
        name: DataTypes.STRING,
        fieldOfStudy: DataTypes.INTEGER,
        createdBy: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Course.belongsTo(models.user, { foreignKey: 'createdBy' });
            }
        }
    });

    return Course;
}
