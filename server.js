var express=require('express'),
	connect = require('connect'),
	repository=require('./repository.js');

var app=express();

app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine','jade');
	app.use(express.bodyParser());
	app.use(connect.static(__dirname + '/public'));
});


// put these in a routers folder

app.get('/:userId',function(req,res){
	//return a list of groupids, member and if its contact

});

app.get('/connect/:user1/:user2',function(req,res){
	console.log('connecting 2 users');
	res.json(repository.addContactByName(req.params.user1,req.params.user2));
});



app.get('/group/:groupId',function(req,res){

});

app.post('/group/:groupId',function(req,res){
	
});

app.get('/', function(req,res){
	res.render('index',{title:'your todo list app'});
});

app.post('/register',function(req,res){
	console.log('registed called');
	if(req.body.key){
		repository.register(req.body.key);
		res.json(repository.getInitialData(req.body.key));
	}
	else res.json("nok");
});


app.get('/:userId/:contactId',function(req,res){
	if(req.params.userId && req.params.contactId){
		res.json(datastore.getMessages(req.params.userId,req.params.contactId));
	}
});

app.post('/:userId/:contactId',function(req,res){
	if(res.params.userId && req.params.contactId && req.body.message){
		datastore.messages.push(
		{
			from:req.params.userId,
			to: req.params.toId,
			message: req.body.message,
			timestamp: new Data()
		});
		res.json("ok");
	}
	res.json("nok");
});
// end routes

app.listen(3000);
console.log('server listening on port 3000');
