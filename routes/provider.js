


exports.save_provider = function(req, res){
		var input = JSON.parse(JSON.stringify(req.body));
		req.getConnection(function (err, connection) {
				var data =	{ Nombre_proveedor: input.providername};
				var query = connection.query("INSERT INTO proveedor SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );
					
					var datos = {id: rows.insertId, name: data}	
				 	console.log(datos);
				 	res.send(datos);
				}); 
		});
}

exports.list = function(req, res){
	req.getConnection(function(err,connection){
					 
						connection.query('SELECT * FROM proveedor',function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
								res.render('providers',{page_title:"Nuestros Proveedores", data: rows});				
						 });
				});
		}


exports.delete = function(req, res){
	req.getConnection(function(err,connection){
					 	var input = JSON.parse(JSON.stringify(req.body));
					 	var id = input.id_provider;
					 	console.log(id);
					 	connection.query('SELECT * FROM factura WHERE id_proveedor = ?',[id],function(err,rows){
					 		if(err)
					 			console.log("Error Selecting : %s ",err);

					 		if(rows.length != 0){
					 			res.send('error');
					 		}
					 		else{
								connection.query('DELETE FROM proveedor WHERE Codigo_proveedor = ?', [id],function(err,rows)
								{
									if(err)
										console.log("Error Selecting : %s ",err );
									res.send(id);	
								});//SE BORRA EL PROVEEDOR
							}
					 	});

						
				});

}