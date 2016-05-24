module.exports = function(sequelize, DataTypes) {
    var University = sequelize.define('university', {
        name: DataTypes.STRING,
        acronym: DataTypes.STRING,
        createdBy: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                University.belongsTo(models.user, { foreignKey: 'createdBy' });
            }
        }
    });

    return University;
}
