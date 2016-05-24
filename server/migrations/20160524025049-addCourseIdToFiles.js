'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'files',
            'couseId',
            Sequelize.INTEGER
        )      
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('files', 'courseId');
    }
};
