var uuid=require('node-uuid');

var user=function(username){
	this.username=username;
	this.contacts=[];
	this.id=[];
}

user.prototype={
	id:null,
	username:null,
	contacts: []
};

var dataStore={
	users:[],
	messages:[],
	storeUser:function(username){
		if(!this.findUser(username)){
			var auser=new user(username);
			auser.id=uuid.v4().substring(0,7);
			auser.contacts.push(auser.id);
			this.users.push(auser);
		}
	},
	findUser: function(key,byid){
		for(var i=0;i<this.users.length;i++){
			var match=!byid? this.users[i].username==key:this.users[i].id==key;
			if(match) return this.users[i];
		}
		return null;
	},
	addUserContact: function(user1, user2){
		var ua=this.findUser(user1);
		var ub=this.findUser(user2);
		if(ua && ub && ua.id!=ub.id && ua.contacts.indexOf(ub.id)<0){
			ua.contacts.push(ub.id);
			ub.contacts.push(ua.id);
		}
	},
	findSuggestedUsers: function(auser){
		var suggestions=[];
		for(var i=0;i<this.users.length && suggestions.length<25;i++){
			if(this.users[i].id==auser.id) continue;
			if(auser.contacts.indexOf(this.users[i].id)<0){
				suggestions.push({
					id: this.users[i].id,
					username:this.users[i].username
				});
			}
		}
		return suggestions;
	},
	getContacts: function(auser){
		var contacts=[];
		console.log('finding contacts for '+auser.username+'. legnth='+auser.contacts.length);
		for(var i=0;i<auser.contacts.length;i++)
			contacts.push({id:auser.contacts[i],username:this.findUser(auser.contacts[i],1).username});
		return contacts;
	},
	getMessages: function(userId1,userId2){
		var msglist=[];
		for(var i=this.messages.length-1;i>=0 && msglist.length<20;i--){
			var msg=this.messages[i];
			if(msg.from==userId1 && msg.to==userId2)
				msglist.push(msg);
		}
		return msglist;
	},
	
}

module.exports=dataStore;
