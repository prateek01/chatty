$(function(){
	$('#registerButton').click(function(){
		$.post('/register',{key:$('#key').val()},function(result){
			$('#register').hide();
			$('#currentlyLoggedinAs').append('You are logged in as '+result.name);

			for(var i=0;i<result.contacts.length;i++){
				var link= result.contacts[i].groupId;
				$('#contacts').append('<li><a href='+link+'>'+result.contacts[i].name+'</a>')
			}

			for(var i=0;i<result.suggestedUsers.length;i++){
				var link= 'connect/'+ result.name+ '/' +result.suggestedUsers[i];
				$('#userlist').append('<li><a href='+link+'>'+result.suggestedUsers[i]+'</a>')
			}
		});

	});
});