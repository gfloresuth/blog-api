
// When the app starts
var express=require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise  = require('bluebird');

var dbConfig={
	client:'mysql',
    connection:{
	 host:'localhost',
	 user:'root',
	 password:'usbw',
	 database:'blog',
	 charset:'utf8'
  }
};

/*
GET  /api/article
GET  /api/article/:article_id
POST /api/article

*/ 


var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

var allowCrossDomain=function(req,res,next){
        res.header('Access-Control-Allow-Origin','*');
        next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))



// elsewhere, to use the bookshelf client:
var bookshelf = app.get('bookshelf');

//model setup
// relationships and login methods
var Article=bookshelf.Model.extend({
	tableName:'article'
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.send(500, 'Something broke!');
});


//routes
//app.get('/',function(req,res){
//	res.send("blog-api up and running");
//});


app.use('/',express.static(__dirname+'/public/'));



/* GET /api/article */
app.get('/api/article',function(req,res){
	new Article().fetchAll()
	.then(function(articles){
        var data = {
            "status":200,
            "message":"Ok",
            "content":articles
        };
		res.json(data);
	}).catch(function(error){
        var data = {
                "status":400,
                "message":"Error retrieving articles"
            };
		console.log(error);
		res.json(data);
	});
});

/* GET /api/article/:article_id */
app.get('/api/article/:article_id',function(req,res){
	var article_id=req.params.article_id;
	new Article().where('id',article_id)
	.fetch()
	.then(function(article){
        var data;
        if (article === null){
            data = {
                "status":400,
                "message":"Errorretrieving article"
            };
        }else{
            data = {
                "status":200,
                "message":"Ok",
                "content":article
            };
        }
        res.json(data);
	}).catch(function(error){
        var data = {
                "status":400,
                "message":"Error retrieving article"
            };
		console.log(error);
		res.json(data);
	});
});


/* POST /api/article/:article_id */

app.post('/api/article/update/:article_id',function(req,res){
	var article_id=req.params.article_id;
	new Article().where('id',article_id)
	.fetch()
	.then(function(article){
        var data;
        if(article!==null){
            var data = {
                "status":200,
                "message":"Updated"
            }
            article.set({
                title:req.body.title,
                body:req.body.body,
                author:req.body.author
            });
            article.save();
            
        }else{
            var data = {
                "status":400,
                "message":"Error retrieving article"
            };
            console.log(error);
        }
        res.json(data);
    }).catch(function(error){
       var data = {
                "status":400,
                "message":"Error updating article"
            };
		console.log(error);
		res.json(data);
    });
    
});

/* POST /api/article */
app.post('/api/article',function(req,res){
	var article=new Article({
		title:req.body.title,
		body:req.body.body,
		author:req.body.author
	});
	article.save().then(function(saved_article){
		res.send(saved_article.toJSON());
	}).catch(function(error){
        var data = {
                "status":400,
                "message":"Error saving article"
            };
		console.log(error);
		res.json(data)
	});
});

app.listen(3000,function(){
	console.log("Express started at port 3000");
});
