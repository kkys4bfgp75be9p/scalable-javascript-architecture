//utility methods
app.Utils = function(){
		return{
			domManipulation: function(data){
				switch (data.type) {
					case "css":
						$(data.what).css(data.styles);
						break;
					case "append":
						$(data.where).append(data.what);
						break;
                    case "setHtml":
                        $(data.where).html(data.what);
                        break;
				    case "remove":
                        $(data.what).remove();
                        break;
                    case "attr":
                    	$(data.what).attr(data.attr);
                    	break;
                    case "addClass":
                    	$(data.where).addClass(data.what);                    	
                    	break;
                    case "removeClass":
                    	$(data.where).removeClass(data.what);                    	                    	
                    	break;
				}
			},
			
			getValue: function(data){
				var elem = this.getElement(data); 
				return elem.val();
			},
			
			getElement: function(data){
                return $(data.selector);
			},
			
			//bind a live event to the module parent element and namspace that event
			setEventBinding: function(data){
				switch (data.method) {
					case "live":
						$(data.selector).live(data.type+"."+data.moduleId, 
							  function(e){
								  data.handler.method.call(data.handler.context || this, e);                        
								}
						  );
						break;
                    case "bind":
                        $(data.selector).bind(data.type+"."+data.moduleId, 
							  function(e){
								  data.handler.method.call(data.handler.context || this, e);                        
								}
                        );
                    case "delegate":
                        $(data.parent).delegate(data.child, data.type+"."+data.moduleId, data.handler.context,function(e){
							  data.handler.method.call(data.handler.context || this, e);                        
							}
                        );
                        break;
				}
			},
            
			//remove any bound events when a module is stopped
			removeEventBinding: function(data){
				switch (data.method) {
					case "live":
						$(data.selector).die(data.type+"."+data.moduleId, 
							  $.proxy(data.handler.context, data.handler.method)
						  );
						break;
                    case "bind":
                        $(data.selector).unbind(data.type+"."+data.moduleId, 
							  $.proxy(data.handler.context, data.handler.method)                        
                        );
                    case "delegate":
                        $(data.parent).undelegate(data.child, data.type+"."+data.moduleId, 
							  $.proxy(data.handler.context, data.handler.method)                        
                        );
                        break;
				}
            },
			
			throttle: function(data){
				//generic throttle function to stop functions from being called more than 1 time per 200ms
				clearTimeout(data.method.tId);
				data.method.tId = setTimeout(function(){
					data.method.call(data.context, data.params);
				}, 500);
			},
			
			setContext: function(data){
				return $.proxy(data.context, data.method);
			},
			
			animate: function(data){
				switch (data.type){
					case "show":
							$(data.selector).show(data.time, data.callback.call(data.context));
						break;
					case "hide":
							$(data.selector).hide(data.time, data.callback.call(data.context));
						break;
					case "animate":
							$(data.selector).animate({
							
							});
						break;
				}
			},
			
			show: function(elem){
				$(elem).show();	
			},
			
			hide: function(elem){
				$(elem).hide();			
			},
			
			toggle: function(elem){
				$(elem).toggle();			
			}
		};
}();