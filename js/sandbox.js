//create the sandbox object
app.Sandbox = function(Core){

    return {
		
		domManipulation: function(data){
            if (data instanceof Array) {
				for (var i = data.length - 1; i >= 0; i--) {
					Core.Utils.domManipulation(data[i]);
				}
				
			}
			else {
				Core.Utils.domManipulation(data);
			}
		},
		
		setEvent: function(data){
            if (data instanceof Array) {
                for (var i = data.length - 1; i >= 0; i--) {
                    Core.Utils.setEventBinding(data[i]);
                }
                
            }
            else {
                Core.Utils.setEventBinding(data);
            }
		},
		
        removeEvent: function(data){
            if (data instanceof Array) {
                for (var i = data.length - 1; i >= 0; i--) {
                    Core.Utils.removeEventBinding(data[i]);
                }
                
            }
            else {
                Core.Utils.removeEventBinding(data);
            }
        },
		
		notify: function(msg){
			if (msg instanceof Array) {
				for (var i = msg.length - 1; i >= 0; i--) {
					Core.Communication.notify(msg[i]);
				}
				
			}
			else {
				Core.Communication.notify(msg);
			}
			
		},
		
		addListener: function(msg){
			if (msg instanceof Array) {
				for (var i = msg.length - 1; i >= 0; i--) {
					Core.Communication.listen(msg[i]);
				}
				
			}
			else {
				Core.Communication.listen(msg);
			}
		},
		
		removeListener: function(msg){
            if (msg instanceof Array) {
                for (var i = msg.length - 1; i >= 0; i--) {
                    Core.Communication.remove(msg[i]);
                }
                
            }
            else {
                Core.Communication.remove(msg);
            }
		},
		
		request: function(data){
			Core.Ajax.request(data);
		},
		
		getElement: function(data){
			return Core.Utils.getElement(data);
		},
		
		throttle: function(data){
			Core.Utils.throttle(data);
		},
		
		setContext: function(data){
			return Core.Utils.setContext(data)
		},
		
		animate: function(data){
			Core.Utils.animate(data);
		},

		show: function(data){
			Core.Utils.show(data);
		},

		hide: function(data){
			Core.Utils.hide(data);
		},

		toggle: function(data){
			Core.Utils.toggle(data);
		}
		
	};
};