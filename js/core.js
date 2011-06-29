//create the application namespace
var app = (function(window, document, undefined){

var moduleData = {};
	
	return {
		
		register: function(moduleId, Creator){
			moduleData[moduleId] = {
				creator: Creator,
				instance: null
			};
		},
		
		start: function(moduleId){
            moduleData[moduleId].instance = 
			moduleData[moduleId].creator(app.Sandbox(this));
			moduleData[moduleId].instance.init();
		},
		
		startAll: function(){
			for (var moduleId in moduleData){
				if (moduleData.hasOwnProperty(moduleId)){
					this.start(moduleId);
				}
			}
		},
		
		stop: function(moduleId){
			var data = moduleData[moduleId];
			if(data.instance){
				data.instance.destroy();
				data.instance = null;
			}
		},
		
        stopAll: function(){
            for (var moduleId in moduleData){
                if (moduleData.hasOwnProperty(moduleId)){
                    this.stop(moduleId);
                }
            }
        },

		getModuleData: function(moduleId){
			return moduleData[moduleId];
		},
		
		/**
		 * Returns the namespace specified and creates it if it doesn't exist
		 * @method namespace
		 * @param  {string*} arguments 1-n namespaces to create 
		 * @return {object}  A reference to the last namespace object created
		 */
		namespace: function() {
		    var a=arguments, o=null, i, j, d;
		    for (i=0; i<a.length; i=i+1) {
		        d = ("" + a[i]).split(".");
		        o = this;
		        for (j=(d[0] == "app") ? 1 : 0; j<d.length; j=j+1) {
		            o[d[j]] = o[d[j]] || {};
		            o = o[d[j]];
		        }
		    }
		    return o;
		}
	};
	
}(this, this.document));