module.exports = function(sequelize, DataTypes) {
    var Course = sequelize.define('course', {
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [5, 30],
                    msg: 'The name must be more than 5 characters and less than 30.'
                }
            }
        },
        fieldOfStudy: {
            type: DataTypes.INTEGER,
            validate: {
                isIn: [[1, 2, 3, 4]]
            }
        },
        createdBy: DataTypes.INTEGER
    }, {
        classMethods: {
            associate: function(models) {
                Course.belongsTo(models.user, { 
                    foreignKey: {
                        fieldName: 'createdBy'
                    }
                });
            }
        }
    });

    return Course;
}
