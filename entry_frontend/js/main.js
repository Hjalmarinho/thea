$( document ).ready(function() {
	console.log( "ready!" );

    // Initialize dropdown
    $('.ui.dropdown')
    .dropdown()
    ;

    //Call REST-API 
    $.ajax({
    	type: 'GET',
    	url: 'http://92.62.34.78:8080/thea-backend/v1/clubs',
    	success: function(data){
			console.log('success', data);    	
    	}
    });
 
});