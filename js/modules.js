//api module
app.register("api-module", function(sandbox){
	/*
	* @constructor
	*/
	return {
		//init and destroy methods REQUIRED
		init: function(){
			this.moduleId = "api-module";
			this.el = sandbox.getElement({selector:"#"+this.moduleId});
			//setup some events and define a callback
			sandbox.setEvent({
				type: "change",
				parent: "#"+this.moduleId,
				child: "#api-type",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: this.moduleId
			});
			
		},
		
		destroy: function(){
		
			delete app.Modules[this.moduleId];

			sandbox.removeEvent({
				type: "change",
				parent: "#"+this.moduleId,
				child: "#api-type",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: this.moduleId
			});			
		},
		
		sendRequest: function(val){
				sandbox.notify({
					type: "api-change",
					data: val
				});
		},
		
		handleEvent: function(e){

			if(e.type == "change"){
				var current = e.currentTarget;
				var apiType = current.options[current.selectedIndex].innerHTML;
				this.sendRequest(apiType);
			}
		}
	};
});

//navigation module
app.register("navigation-module", function(sandbox){
	/*
	* @constructor
	*/
	return {
		//init and destroy methods REQUIRED
		init: function(){
			this.moduleId = "navigation-module";
			this.el = sandbox.getElement({selector:"#"+this.moduleId});
			//setup some events and define a callback
			sandbox.setEvent([{
				type: "click",
				parent: "#"+this.moduleId,
				child: "a",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: this.moduleId
			}, {
				type: "click",
				parent: "#"+this.moduleId,
				child: "#submit",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: this.moduleId
			}]);
			
		},
		
		destroy: function(){
		
			delete app.Modules[this.moduleId];

			sandbox.removeEvent([{
				type: "click",
				parent: "#"+moduleId,
				child: "a",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: moduleId
			}, {
				type: "click",
				parent: "#"+moduleId,
				child: "#submit",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: moduleId
			}]);
			
		},
		
		//methods for functionality
		handleEvent: function(e){
			switch (e.currentTarget.id) {
				case "submit":
					var query = document.getElementById('search').value;
					sandbox.notify({
						type: "search-request",
						data: query
					});
					break;
				default:
					var query = e.currentTarget.hash.substring(1, e.currentTarget.hash.length);
					sandbox.notify({
						type: "search-request",
						data: query
					});		
			}
		}
	};
});

//viewport module 
app.register("viewPort-module", function(sandbox){
	/*
	* @constructor
	* these are the public methods
	*/
	return {

		//init and destroy methods REQUIRED
		init: function(){
			this.moduleId = "viewport-module";
			this.paginator = sandbox.getElement({ selector: ".paginator"});
			this.el = sandbox.getElement({selector:"#"+this.moduleId});
			this.currentApi = "flickr";
			this.viewportData = null;

			sandbox.addListener([{
				type: "flickr-success",
				context: this,
				callback: this.showFlickrPics
			}, {
				type: "ajax-start",
				context: this,
				callback: this.displayLoader
			}, {
				type: "ajax-stop",
				context: this,
				callback: this.removeLoader
			},{
				type: "api-change",
				context: this,
				callback: this.changeApi
			},{
				type: "search-request",
				context: this,
				callback: this.getViewport				
			}]);

			sandbox.setEvent([{
				type: "click",
				parent: "#"+this.moduleId,
				child: "img",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: this.moduleId
			}
			]);
			
			this.getFlickr();
		},
		
		destroy: function(){
			delete app.Modules[this.moduleId];
			sandbox.removeListener([{
				type: "flickr-success",
				context: this,
				callback: this.showFlickrPics
			}, {
				type: "ajax-start",
				context: this,
				callback: this.displayLoader
			}, {
				type: "ajax-stop",
				context: this,
				callback: this.removeLoader
			}]);
			
			sandbox.removeEvent({
				type: "click",
				parent: "#"+this.moduleId,
				child: "img",
				method: "delegate",
				handler: {context:this, method:this.handleEvent},
				moduleId: this.moduleId
			});
		},
		
		getFlickr: function(data){
			data ? data : data = {};
			data.query ? data.query : data.query = "everyone";
			sandbox.request({
				type: "json",
				url: "http://api.flickr.com/services/feeds/photos_public.gne?tags="+data.query+"&format=json&jsoncallback=?",
				callback: sandbox.setContext({context: this, method: "showFlickrPics"})
			});
			
		},
		
		getYoutube: function(data){
			data ? data : data = {};
			data.query ? data.query : data.query = "everyone";
			sandbox.request({
				type: "get",
				url: "http://gdata.youtube.com/feeds/api/videos?orderby=updated&vq="+data.query+"&alt=json&format=5",
				callback: sandbox.setContext({context: this, method: "showYoutube"}),
				dataType: "jsonp"
			});
						
		},
		
		getViewport: function(data){
			if(this.currentApi == "flickr"){
				this.getFlickr({query: data});
			}else{
				this.getYoutube({query: data});
			}
		},
		
		showPagination: function(){
			$(this.paginator).children().show();
			$("#myDiv").unbind().remove();
		},
		
		//this method will display the results of the flickr ajax call 
		showFlickrPics: function(data){
			this.viewportData = data;
			var fragment = document.createDocumentFragment();
			var title = data.title;			
			
			//get a ref to the main viewport
			var main = sandbox.getElement({
				selector: "#main"
			});
			
			//loop over the returned json and display the elements
			if(data.items){
				
				for (var i = data.items.length - 1; i >= 0; i--) {
					var image = new Image();
					image.src = data.items[i].media.m;
					image.id = i;
					fragment.appendChild(image);
				}
			}
			
			sandbox.domManipulation([{
				type: "setHtml",
				where: main,
				what: fragment
			}, {
				type: "setHtml",
				where: sandbox.getElement({
					selector: "h2:first"
				}),
				what: title
			}]);
		},
		
		showYoutube: function(data){
			if (!data.feed){return}
			this.viewportData = data;
			var feed = data.feed;
			var entries = feed.entry|| [];
			var html = ['<ul class="videos">'];
			var title = feed.title.$t;
			this.dataArray = [];
			
			
			sandbox.domManipulation( {
				type: "setHtml",
				where: sandbox.getElement({
					selector: "h2:first"
				}),
				what: title
			});
							
			for (var i = 0; i < entries.length; i++) {
				var entry = entries[i];
				var title = entry.title.$t.substr(0, 20);
				var thumbnailUrl = entries[i].media$group.media$thumbnail[0].url;
				var playerUrl = entries[i].media$group.media$content[0].url;
		
				html.push('<li class="videoElem" id="'+i+'">',
				          '<span class="titlec">', title, '...</span><br /><img id='+i+' src="', 
				          thumbnailUrl, '" width="130" height="97"/>', '</span></li>');
				this.dataArray.push(playerUrl)
			}
	
			html.push('</ul><br style="clear: left;"/>',
						'<div id="playerContainer">',
			    		'<object id="player"></object>',
						'</div>');
			document.getElementById('main').innerHTML = html.join('');
			if (entries.length > 0) {
				this.loadVideo(entries[0].media$group.media$content[0].url, false);
			}
		},
		
		getVideoUrl: function(id){
			var playerUrl = this.dataArray[id];
			var left = $("#"+id).position().left;
			var top = $("#"+id).position().top;
			var position = {left: left, top: top};
			this.loadVideo(playerUrl, false, position);
		},
		
		loadVideo: function(playerUrl, autoplay, position) {
		  swfobject.embedSWF(
		      playerUrl + '&rel=1&border=0&fs=1&autoplay=' + 
		      (autoplay?1:0), 'player', '290', '250', '9.0.0', false, 
		      false, {allowfullscreen: 'true'});
		 if(position){     
			 $("#playerContainer").hide().css({
			 	left: position.left,
			 	top: position.top
			 }).fadeIn("slow");
		 }
		},		
		
		displayLoader: function(){
			sandbox.domManipulation({
				type: "addClass",
				where: this.el,
				what: "viewport-loading"
			});
		},
		
		removeLoader: function(){
			sandbox.domManipulation({
				type: "removeClass",
				where: this.el,
				what: "viewport-loading"
			});
		},
		
		handleEvent: function(e){

			var index = e.currentTarget.id;

			if(this.currentApi == "flickr"){
				var flickr = this.viewportData.items[index];
				var image = flickr.media.m;
				var title = flickr.title;
				var content = "<img src='"+image+"'/><p>"+title+"</p>";
				this.showLightbox(content);

			}else{
				var youTube = this.viewportData.feed.entry[index];
				var video = youTube.media$group.media$thumbnail[0].url;
				var title = youTube.title.$t;
				var content = "<img src='"+video+"'/><p>"+title+"</p>";
				this.showLightbox(content);
			}
		},
		
		showLightbox: function(content){
				var container = document.createElement("div");
				container.id = "lightbox";			

				if(!document.getElementById("lightbox")){
					container.innerHTML = content;
					document.getElementById(this.moduleId).appendChild(container);
				}else{
					document.getElementById("lightbox").innerHTML = content;
				}		
		},
		
		changeApi: function(api){
			api = api.toLowerCase();
			if(api == "you tube"){
				this.getYoutube();
			}else{
				this.getFlickr();
			}
			this.currentApi = api;
		}
	};
});

//start the application by starting all modules
app.startAll();	
