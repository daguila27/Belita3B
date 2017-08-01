exports.search = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err,connection){
                        console.log(input);
                        var search = input.tag; 
                        var query = 'SELECT * FROM tags WHERE tag LIKE "'+'%' + search + '%"';
                        connection.query(query,function(err,rows)
                        {
                                if(err)
                                        console.log("Error Selecting : %s ",err );

                                 
                                res.send(rows);
                        });
                });
}


exports.add = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    req.getConnection(function(err, connection){
                var data = {
                    tag : input.value
                };
                connection.query("INSERT INTO tags SET ? ", data, function(err,rows)
                        {
                                if(err)
                                        console.log("Error Selecting : %s ",err );

                                //res.render('test', {page_title: "Prueba", datos: rows});
                                 res.send(rows);
                        });
    });
}


exports.save = function(req, res){
    var input = JSON.parse(JSON.stringify(req.body));
    var tags = input.tags;
    var aux = "";
    var data;
    for(var i=0; i<tags.length; i++){
        console.log("tags: " + tags[i]);
        store_tag(tags[i], req);
        
    }

    res.send('ok');    


}


function store_tag(tag_i, req){
        req.getConnection(function(err, connection){
                var data = {
                    tag : tag_i
                };
                connection.query('SELECT * FROM tags WHERE tag = ?', tag_i, function(err, rows){
                    if(err)
                        console.log("Error Selecting : %s ", err);
                    if(rows.length == 0){
                        connection.query("INSERT INTO tags SET ? ", data, function(err,rows)
                            {
                                if(err)
                                        console.log("Error Selecting : %s ",err );

                                console.log('Tag agregado correctamente : %s', rows);
                                //res.render('test', {page_title: "Prueba", datos: rows});
                            });
                    }
                });
        });
}

function size(tags){
    return tags.length;
}
function index(tags, index){
    return tags[index];
}