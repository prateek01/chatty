var uuid=require('node-uuid');

var repository = {
	users:{},
	idToName:{},
	userGroups:{},
	groups:{},
	register: function(username){
		var id=this.genUniqueId(this.users);
		this.users[id]=username;
		this.idToName[username]=id;
		this.userGroups[id]=[];
		this.addContact(id,id,null);
	},
	
	addContact:function(uid1,uid2,createInverse){
		for(var i=0;i<this.userGroups[uid1].length;i++)
			if(this.groups[this.userGroups[uid1][i]].isContact && thiss.groups[this.userGroups[uid1][i]].contactId==uid2)
				return;
		var gid=this.genUniqueId(this.groups);
		this.groups[gid]={isContact:true,contactId:uid2};
		if(createInverse)
			this.addContact(uid2,uid1,null);

	},

	genUniqueId:function(container){
		var x;
		do{
			x=uuid.v4().substring(0,5);
		} while(container[x] == 'undefined');
		return x;	
	}
}

module.exports=repository;