
var express = require('express');//SE CARGA EL MODULO EXPRESS EN UNA VARIABLE
var routes = require('./routes');
var path = require('path');//PATH ES UN MODULO DE GESTION DE RUTAS DE NODEJS
var http = require('http');
/*ESTAS VARIABLES NOS PERMITEN TENER ACCESO A LA FUNCIONES
CORRESPONDIENTES AL MODULO QUE HAYAMOS INVOCADO EN REQUIRE('...')*/


var app = express();//SE CREA EL OBJETO SERVIDOR

var flash = require('connect-flash');
var connection  = require('express-myconnection');
var mysql = require('mysql');

var index = require('./routes/index');
var provider = require('./routes/provider');
var facture = require('./routes/facture');
var product = require('./routes/product');
var voucher = require('./routes/voucher');
var tag = require('./routes/tags');
var test = require('./routes/test');
var sale = require('./routes/sale');
var seller = require('./routes/seller');
var client = require('./routes/client');
var user = require('./routes/users');


// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.methodOverride());
app.use(flash());
app.use(express.cookieParser('isLogged'));
app.use(express.cookieSession());

app.use(express.static(path.join(__dirname, 'public')));

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use(//EL ERROR DE NO IDENTIFICACION DEL QUERY ERA PORQUE ESTABA MAL CONFIGURADA LA CONEXION 
    connection(mysql,{
        host: 'localhost',
        user: 'root',
        password : 'gallardo271995',
        database:'belita'
    },'pool')
);

/*var pool  = mysql.createPool({
  connectionLimit : 10,
  database 		  : 'belita',
  host            : 'localhost',
  user            : 'root',
  password        : 'gallardo271995'
});

app.use(pool);*/


app.get('/', index.index);
app.get('/admin_login', index.to_login);



app.post('/login', user.login);
//app.get('/', test.test);
//app.post('/search_provider', test.search);


app.get('/providers', provider.list);
app.post('/save_provider', provider.save_provider);
app.post('/delete_provider', provider.delete);

app.post('/new_inventory/:codFactureBundle', facture.new_inventory);
app.get('/facture_list', facture.list);
app.post('/saved_facture', facture.save);


app.get("/new_voucher", voucher.new_voucher);
app.post("/generate_voucher", voucher.generate_voucher);



app.post('/new_product', product.new_product);
app.post('/delete_product', product.delete);
app.post('/find_product', product.find);
app.get('/stock_list', product.list);

app.post('/search_tag', tag.search);
app.post('/add_tag', tag.add);
app.post('/save_tags', tag.save);



app.get('/new_sale', sale.new);

app.get('/seller_list', seller.list);
app.post('/find_seller', seller.find);
app.post('/new_seller', seller.new);
app.post('/erase_seller', seller.erase);

app.post('/find_client', client.find);

//app.post('/new_sale', sale.new);
app.use(app.router);

http.createServer(app).listen(app.get('port'), function(){
  console.log('The game starts on port ' + app.get('port'));
});