exports.find = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection){
    	connection.query('SELECT * FROM cliente WHERE rut = ?', input.find_rut, function(err, rows){
    		if(err)
    			console.log("Error Selecting : %s", err);
    		console.log(rows);
    		res.send(rows);
    	});
    });
}