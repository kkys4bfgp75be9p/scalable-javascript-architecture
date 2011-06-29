app.Ajax = function(){
    //bind ajax start and stop events to the document
    $(document).ajaxStart(function(){
		app.Communication.notify({
			type: "ajax-start"
		});
	})
	.ajaxStop(function(){
		app.Communication.notify({
            type: "ajax-stop"
        });
	}); 
	
	//return the public methods
	return{
		request: function(data){
			switch (data.type) {
				case "json":
		            $.getJSON(
		                data.url,
		                data.callback
					);
					break;
				case "post":
		            $.post(
		                data.url,
		                data.callback
					);
					break;
				case "get":
		            $.get(
		                data.url,
		                data.callback,
		                data.dataType
					);
					break;					
			} 
		}
	};
}();