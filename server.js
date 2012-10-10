var express=require('express'),
	connect = require('connect'),
	datastore=require('./chatStore.js');

var app=express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine','jade');
	app.use(express.bodyParser());
	app.use(connect.static(__dirname + '/public'));
});

app.get('/', function(req,res){
	res.render('index',{title:'your todo list app'});
});

app.post('/register',function(req,res){
	console.log('registed called');
	if(req.body.key)
		datastore.storeUser(req.body.key);
	res.json(datastore.users);
});

app.listen(3000);
console.log('server listening on port 3000');
