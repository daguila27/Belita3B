
exports.new_product = function(req, res){
      var input = JSON.parse(JSON.stringify(req.body));
      var cant = input.cantidad;
      var ind_bundle = input.indice_bulto;
		req.getConnection(function (err, connection) {
				var data = {
					id_factura:  input.codigo_factura,
					indice_bulto: input.indice_bulto,
					cantidad:   input.cantidad,
					nombre: 	input.nombre_producto,
					precio:   input.precio 
				};
				console.log(data);
				var query = connection.query("INSERT INTO producto SET ? ", data, function(err, rows)
				{

					if (err)
							console.log("Error inserting : %s ",err );
					datos = {'datos_producto': data, 'id_producto': rows.insertId};
					
					res.send(datos);
				});
		});
}


exports.delete = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connection){
		var id = input.id_producto;
		var query = connection.query("DELETE FROM producto WHERE id_producto = ?", id, function(err, rows)
		{
			if(err)
				console.log("Error inserting : %s", err);
			console.log(rows);
			res.send(id);
		})
	});
}

exports.find = function(req, res){
	var input = JSON.parse(JSON.stringify(req.body));
	var code = input.find_code;
	var id_producto = Math.floor(input.find_code/1000);
	var cantidad = code.substring(id_producto.toString().length, code.length);
	cantidad = parseInt(cantidad);
	req.getConnection(function(err, connection){
		connection.query("SELECT * FROM producto WHERE id_producto = ?", id_producto, function(err, rows){
			if(err)
				console.log("Error inserting : %s", err);

			
			var data = {rows: rows, cant: cantidad};
			console.log(data);
			res.send(data);			
		});
	});
}



exports.list = function(req, res){
	req.getConnection(function(err,connection){
					 connection.query('SELECT * FROM producto',function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
								console.log(rows);	
								res.render('stock_list',{page_title:"Stock de productos", data: rows});				
						 });
				});
}