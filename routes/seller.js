exports.list = function(req, res){
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM vendedor",function(err,rows){
			if(err)
				console.log("Error inserting : %s", err);
			res.render('seller_list', {page_title: 'Vendedores', data: rows});
		});
	});
}

exports.find = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM vendedor WHERE rut = ?", input.find_rut, function(err, rows){
			if(err)
				console.log("Error inserting : %s", err);

			
			console.log(rows);
			res.send(rows);			
		});
	});
}


exports.new = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connection){
		data = {nombre: input.nombre, rut: input.rut};
		connection.query("INSERT INTO vendedor SET ?", data, function(err, rows){
			if (err)
				console.log("Error inserting : %s ",err );
			else{
				console.log(data);
				res.send(data);	
			}
		});
	});
}


exports.erase = function(req, res){
	req.getConnection(function(err,connection){
					 	var input = JSON.parse(JSON.stringify(req.body));
					 	var rut = input.rut;
					 	console.log(rut);
						connection.query('DELETE FROM vendedor WHERE rut = ?', [rut],function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );

								console.log(rows);	
								res.send(rut);	
						});//SE BORRA EL PROVEEDOR
						
				});
}