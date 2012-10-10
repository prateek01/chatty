$(function(){
	$('#registerButton').click(function(){
		$.post('/register',{key:$('#key').val()},function(result){
			for(var i=0;i<result.length;i++){
				$('#userlist').add('<li>'+result[i].username+'</li>');
			}
			
		});

	});
});