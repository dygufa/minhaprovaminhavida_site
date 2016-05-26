'use strict';

module.exports = {
    up: function(queryInterface, Sequelize) {
        queryInterface.renameColumn('files', 'couseId', 'courseId');
    },

    down: function(queryInterface, Sequelize) {
        queryInterface.renameColumn('files', 'courseId', 'couseId');
    }
};
