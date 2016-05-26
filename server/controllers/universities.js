var fs          = require('fs'),
    models      = require('../models');

exports.getIndex = function(req, res) {
	models.university.findAll().then(function (universities) {
		res.send(JSON.stringify({'data': universities}));
	});
}

exports.addUniversity = function(req, res) {
    var formData = req.body;

    models.university.create({
        name: formData.name,
        acronym: formData.acronym,
        createdBy: 4
    }).then(function(university) {
        res.send(JSON.stringify({'data': university}))
    })  
       
}

exports.removeUniversity = function(req, res) {
    models.university.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(deleted) {
        if (deleted === 0) {
            res.status(404).send(JSON.stringify({'data': {}}))
        } else {
            res.send(JSON.stringify({'data': {}}))
        }
    });
}