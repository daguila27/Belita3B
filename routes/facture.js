exports.new_inventory = function(req, res){
	var input = req.params;
	req.getConnection(function(err,connection){
						var ind_bulto = input.codFactureBundle.substring(input.codFactureBundle.length - 2, input.codFactureBundle.length);
						var cod_factura = input.codFactureBundle.substring(0, input.codFactureBundle.length - 2);
						console.log("indice de bulto : " + ind_bulto);
						console.log("codigo de factura : " + cod_factura);
						connection.query('SELECT * FROM factura WHERE id_Factura = ?', cod_factura,function(err,rows)
						{
								if(err)
										console.log("Error Selecting : %s ",err );
				 				
				 				console.log(rows);
				 				var info_facture = rows;
				 				connection.query('SELECT * FROM producto WHERE id_factura = ?', cod_factura,function(err, rows){
				 					if(err)
				 						console.log("Error Selecting : %s ", err);
				 					res.render('new_inventory', {page_title: 'Nuevo Inventario', data_facture: info_facture, data_products: rows, index_bundle: ind_bulto});
						 		
				 				});	
				 				
						});
				 				
				});


						 
}
exports.list = function(req, res){
	var list_factura;
	req.getConnection(function(err,connection){
						connection.query('SELECT * FROM factura',function(err,rows)
						{
								if(err){
										console.log("Error Selecting : %s ",err );
										}
								list_factura = rows;
								req.getConnection(function(err,connection){
									connection.query('SELECT * FROM proveedor',function(err,rows){
										if(err){
											console.log("Error Selecting : %s ",err );
											}			
										res.render('facture_list', {page_title: 'Facturas pendientes', data_f: list_factura, data_p: rows });
						 			});
						 		});
						});
					});
	}

exports.save = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
	req.getConnection(function(err, connection){
		connection.query('UPDATE factura SET Ready = true WHERE id_Factura = ?', input.id_Factura, function(err, rows){

			if(err)
				console.log("Error Selecting : %s ",err );

			console.log("REDIRECT");
			res.redirect('/facture_list');

		});
	});
}