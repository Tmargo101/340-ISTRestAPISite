//// Utilities (enough of these can be a library lol)
// Ajax utility
//Args: 
//	GetPost (is this a get or a post)
//	d - data {path:'about'}
//	[idForSpinner]	#parent (if I want a spinner to show up while it is loading)
//return
//	ajax objects
//use:
//	xhr('get','{path:'/degrees/'}','')

function xhr(getPost, data, idForSpinner){
	return $.ajax({
		type: getPost,
		cache: false,
		async: true,
		dataType: 'json',
		data: data,
		url: 'assets/scripts/proxy.php',
		beforeSend: function(){
			//create the spinner if there is a 3rd argument
			$(idForSpinner).append('<img src="assets/images/gears.gif" class="dontuse"/>');
			
		}
	}).always(function(){
		//Kill the spinner
		$(idForSpinner).find('.dontuse').fadeOut(500,function(){
			//kill it
			$(this).remove();
		});
	}).fail(function(err){
		console.log(err)
	});
	return 
}


// GetAttributesByName
// array - an array of objects
// name - name of the name / value pair's object that I want to send back
// value - value of the name / value pair's object that I want to send back

function getAttributesByName(array, name, value) {
	var result = null;
	$.each(array, function(){
		if(this[name] === value) {
			result = this;
		}
	});//End of EACH
	return result;
}//End of getAttributesByName

