var uuid=require('node-uuid');

var user=function(username){
	this.username=username;
}

user.prototype={
	id:null,
	username:null,
	contacts:[]
};

var dataStore={
	users:[],
	storeUser:function(username){
		if(!this.findUser(username)){
			var auser=new user(username);
			auser.id=uuid.v4();
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
		if(ua && ub){
			ua.contacts.push(ub.id);
			ub.contacts.push(ua.id);
		}
	}
}

module.exports=dataStore;
