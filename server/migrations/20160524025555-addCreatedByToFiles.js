'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'files',
            'createdBy',
            Sequelize.INTEGER
        )
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('files', 'createdBy')
    }
};
