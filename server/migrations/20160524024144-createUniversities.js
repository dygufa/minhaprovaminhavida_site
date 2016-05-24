'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.createTable(
            'universities', {
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
                name: Sequelize.STRING,
                acronym: Sequelize.STRING,
                createdBy: {
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
        queryInterface.dropTable('universities')
    }
};
