var fs          = require('fs'),
    models      = require('../models');

exports.getIndex = function(req, res) {
	models.course.findAll().then(function (universities) {
		res.send(JSON.stringify({'data': universities}));
	});
}

exports.addCourse = function(req, res) {
    var formData = req.body;

    models.course.create({
        name: formData.name,
        fieldOfStudy: 1,
        createdBy: 4
    }).then(function(course) {
        res.send(JSON.stringify({'data': course}))
    })  
       
}

exports.removeCourse = function(req, res) {
    models.course.destroy({
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