var models  = require('../models');

exports.getIndex = function(req, res) {
	models.File.findAll().then(function (files) {
		console.log(files);
		res.send({'files': files});
	});
}

exports.addFile = function(req, res) {
	console.log(req.body);

	/*
	models.File.create({
        name: 'Prova 1',
        professor: 'Raimundinho',
        course: 'Fisica 2',
        file: 'Indefinido'
    });
	*/
	res.send({'files': JSON.stringify(req.body)})
}