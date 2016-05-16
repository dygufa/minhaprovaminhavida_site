var Sequelize = require('sequelize');
	fs = require('fs'), 
    path = require("path"),
	models_path = process.cwd() + '/server/models',
    db = {};

var sequelize = new Sequelize(process.env.PSQL_URL);

fs
.readdirSync(models_path)
.filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(function(file) {
    var model = sequelize.import(path.join(models_path, file));
    db[model.name] = model;
});

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;