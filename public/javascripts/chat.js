$(function(){
	$('#registerButton').click(function(){
		$.post('/register',{key:$('#key').val()},function(result){
			$('#register').hide();
			$('#currentlyLoggedinAs').append('You are logged in as '+result.username);

			for(var i=0;i<result.contacts.length;i++){
				var link= result.id+ '/' +result.contacts[i].id;
				$('#contacts').append('<li><a href='+link+'>'+result.contacts[i].username+'</a>')
			}

			for(var i=0;i<result.suggestedUsers.length;i++){
				var link= 'add/'+ result.id+ '/' +result.suggestedUsers[i].id;
				$('#userlist').append('<li><a href='+link+'>'+result.suggestedUsers[i].username+'</a>')
			}
		});

	});
});