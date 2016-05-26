module.exports = function(sequelize, DataTypes) {
    var Provider = sequelize.define('provider', {
        type: DataTypes.INTEGER,
        externalId: DataTypes.STRING,
        externalToken: DataTypes.STRING 
    }, {
        classMethods: {
            associate: function(models) {
                Provider.belongsTo(models.user, { foreignKey: 'userId' });
            }
        }
    });

    return Provider;
}
