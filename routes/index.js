exports.index = function(req, res){
  res.render('index', { title: 'Call Service' });
};

exports.to_login = function(req, res){
	res.render('admin_login', {page_title: 'Ingreso de Administrador', login: ''});
}
