var uuid=require('node-uuid');

var repository = {
	users:{},
	userGroups:{},
	groups:{},
	messages:{},

	register: function(username){
		if(this.users[username] == undefined){
			var id=this.genUniqueId(this.users);
			this.users[id]=username;
			this.users[username]=id;
			this.userGroups[id]=[];
		}
	},

	addContactByName:function(user1,user2,createInverse){
		var x= this.users[user1];
		var y= this.users[user2];
		if(x && y){
			var x=addContact(x,y,true);
			if(x!=null)
				return {groupId:x,isContact:true,contactName:user2};
		}
		return null;
	},
	addContact:function(uid1,uid2,createInverse){
		for(var i=0;i<this.userGroups[uid1].length;i++)
			if(this.groups[this.userGroups[uid1][i]].isContact && 
				this.groups[this.userGroups[uid1][i]].contactId==uid2)
				return null;
		var gid=this.genUniqueId(this.groups);
		this.groups[gid]={isContact:true,contactId:uid2};
		this.userGroups[uid1].push(gid);
		if(createInverse!=null)
			this.addContact(uid2,uid1,null);

		return gid;
	},

	getInitialData: function(username){
		var x={
			groups:[],
			suggestedUsers:[]
		}

		var ug=this.userGroups[this.users[username]];
		var contacts=[];
		for(var i=0;i<ug.length;i++){
			x.groups.push({
				groupId:ug[i],
				isContact:this.groups[ug[i]].isContact,
				contactName: this.users[this.groups[ug[i]].contactId]
			});

			if(x.groups[x.groups.length-1].isContact)
				contacts.push(x.groups[x.groups.length-1].contactName);
		}
	},

	getMessages:function(groupId){
		var msglist=[];
		for(var i=)
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