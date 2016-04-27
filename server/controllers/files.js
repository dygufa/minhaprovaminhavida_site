exports.getIndex = function(req, res) {
	res.send({'files': [{'id': 1, 'name': 'Arquivo de verdade'}]})
}