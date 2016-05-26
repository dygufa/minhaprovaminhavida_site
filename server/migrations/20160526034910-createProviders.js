'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable(
            'providers', {
                id: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                createdAt: {
                    type: Sequelize.DATE
                },
                updatedAt: {
                    type: Sequelize.DATE
                },
                type: Sequelize.INTEGER,
                externalId: Sequelize.STRING,
                externalToken: Sequelize.STRING,
                userId: {
                    type: Sequelize.INTEGER,
                    references: {
                        model: 'users',
                        key: 'id'
                    }
                }
            }
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.dropTable('providers')
    }
};
