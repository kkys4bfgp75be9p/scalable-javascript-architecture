//inter-module communication methods
app.Communication = function(){
	//object containing all the handler functions
	var handlers = {};
	
	return{
		listen: function(msg){
			var type = msg.type;
			if (!handlers[type]) {
				handlers[type] = [];
			}
			handlers[type].push({context:msg.context, callback:msg.callback});
		},
		
		notify: function(msg){
			if(!msg.target){
				msg.target = this;
			}
			var type = msg.type;
			if (handlers[type] instanceof Array) {
				var msgList = handlers[type];
				for (var i = 0, len = msgList.length; i < len; i++) {
					msgList[i].callback.call(msgList[i].context, msg.data);
				}
			}
		},
		
		remove: function(msg){
			var type = msg.type, callback = msg.callback, handlersArray = handlers[type];
			if (handlersArray instanceof Array) {
				for (var i=0, len=handlersArray.length; i < len; i++){
					if (handlersArray[i].callback == callback){
						break;
					}
				}
				handlers[type].splice(i, 1);
			}
		}
	}		
}();