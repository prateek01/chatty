var uuid=require('node-uuid');

var repository = {
	users:{},
	names:{},
	groups:{},
	messages:{},

	register: function(username){
		if(this.names[username] == undefined){
			var id=this.genUniqueId(this.users);
			var auser={
				'id':id,
				name:username,
				contacts:[],
				contactGroups:[],
				groups:[]
			};
			this.users[id]=auser;
			this.names[username]=auser;
			this.addContact(auser,auser,null);
		}
	},

	addContactByName:function(user1,user2,createInverse){
		var x= this.names[user1];
		var y= this.names[user2];
		if(x && y){
			var gid=this.addContact(x,y,true);
			if(gid!=null){
				return {groupId:gid,isContact:true,contactName:x.name};
			}
		}
		return null;
	},
	
	addContact:function(user1,user2,createInverse){
		var gid=null;
		if(user1.contacts.indexOf(user2.id)<0){
			gid=this.genUniqueId(this.groups);
			user1.contacts.push(user2.id);
			user1.contactGroups.push(gid);
			if(this.groups[gid]==undefined)
				this.groups[gid]=new Array(user1.id,user2.id);
		}

		if(createInverse!=null)
			this.addContact(user2,user1,null);

		return gid;
	},

	getInitialData: function(username){
		var x={
			id:'',
			name:'',
			contacts:[],
			suggestedUsers:[]
		}

		var user=this.names[username];
		if(user==undefined)
			return x;
		
		x.id=user.id;
		x.name=user.name;

		for(var i=0;i<user.contacts.length;i++){
			x.contacts.push({
				groupId:user.contactGroups[i],
				name: this.users[user.contacts[i]].name
			});
		}

		for(var uid in this.users){
			if(x.suggestedUsers.length>20)
				break;
			if(user.contacts.indexOf(uid)<0)
				x.suggestedUsers.push(this.users[uid].name);
		}

		return x;
	},

	getMessages:function(groupId){
		
	},

	genUniqueId:function(container){
		var x;
		do{
			x=uuid.v4().substring(0,5);
		} while(container[x] != undefined);
		return x;	
	}
}

module.exports=repository;