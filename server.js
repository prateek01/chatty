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
	var thisUser=datastore.findUser(req.body.key);
	res.json(
	{
		id: thisUser.id,
		username:thisUser.username,
		contacts: datastore.getContacts(thisUser),
		suggestedUsers: datastore.findSuggestedUsers(thisUser)	
	});
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

app.listen(3000);
console.log('server listening on port 3000');
