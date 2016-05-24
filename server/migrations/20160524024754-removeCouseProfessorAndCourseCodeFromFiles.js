'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.removeColumn('files', 'courseCode');
        queryInterface.removeColumn('files', 'course');
        queryInterface.removeColumn('files', 'professor');        
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.addColumn(
            'files',
            'courseCode',
            Sequelize.STRING
        );

        queryInterface.addColumn(
            'files',
            'course',
            Sequelize.STRING
        );

        queryInterface.addColumn(
            'files',
            'professor',
            Sequelize.STRING
        );
    }
};
