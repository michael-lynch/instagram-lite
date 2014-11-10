/*!

Name: Instagram Lite
Dependencies: jQuery
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: January 14, 2014
Licensed under the MIT license

*/

;(function($) {

    $.fn.instagramLite = function(options) {
    
    	// return if no element was bound
		// so chained events can continue
		if(!this.length) { 
			return this; 
		}

		// define default parameters
        var defaults = {
            username: null,
            clientID: null,
            limit: null,
            list: true,
            urls: false,
            max_id: null,
            loadMore: false,
            error: function() {},
            success: function() {}
        }
        
        // define plugin
        self.plugin = this;

        // define settings
        self.plugin.settings = {}
 
        // merge defaults and options
        self.plugin.settings = $.extend({}, defaults, options);

        // define element
        self.el = $(this);
       
        // init
        self.loadContent();
        
        // bind load more click event
        if(plugin.settings.loadMore){
        	$('.load-more').on('click',function(e){
	        	e.preventDefault();
	        	self.loadContent();
	        });
        } 
    },
    getMaxId = function(items){
    
    	// return id of last item
    	return items[items.length-1].id;
    },
    loadContent = function(){

    	// if client ID and username were provided
        if(plugin.settings.clientID && plugin.settings.username) {
        
	        // for each element
	        el.each(function() {
	        
	        	// search the user
	        	// to get user ID
	        	$.ajax({
		        	type: 'GET',
		        	url: 'https://api.instagram.com/v1/users/search?q='+plugin.settings.username+'&client_id='+plugin.settings.clientID+'&callback=?',
		        	dataType: 'jsonp',
		        	success: function(data) {
		        	
		        		// for each user returned
		        		for(var i = 0; i < data.data.length; i++) {
		        		
		        			//d efine user namespace
			        		var thisUser = data.data[i];
			        		
			        		// if returned username matches supplied username
			        		if(thisUser.username === plugin.settings.username) {
			        		
			        			// construct API endpoint
								var url = 'https://api.instagram.com/v1/users/'+thisUser.id+'/media/recent/?client_id='+plugin.settings.clientID+'&count='+plugin.settings.limit+'&callback=?';
								
								// concat max id if max id is set
								url += (plugin.settings.max_id) ? '&max_id='+plugin.settings.max_id : '';

			        			$.ajax({
						        	type: 'GET',
						        	url: url,
						        	dataType: 'jsonp',
						        	success: function(data) {
						        		
						        		// if success status
						        		if(data.meta.code === 200) {
											
							        		// for each piece of media returned
							        		for(var i = 0; i < data.data.length; i++) {
							        		
							        			// define media namespace
							        			var thisMedia = data.data[i];
							        			
							        			// if media type is image
							        			if(thisMedia.type === 'image') {
							        			
								        			// construct image
								        			var img = '<img src="'+thisMedia.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+thisMedia.filter+'" />';

								        			// if url setting is true
								        			if(plugin.settings.urls) {
								        			
								        				var img = '<a href="'+thisMedia.link+'" target="_blank">'+img+'</a>';
									        			
								        			}
								        			
								        			// if list setting is true
								        			if(plugin.settings.list) {
								        				var img = '<li>'+img+'</li>';
								        			}

								        			// append image
								        			el.append(img);
							        			
							        			}
							        			
							        		}
							        		
							        		// set new max id
							        		plugin.settings.max_id = self.getMaxId(data.data);
							        		
							        		// execute success callback
							        		plugin.settings.success.call(this);
						        		
						        		} else {
							        		
							        		// execute error callback
							        		plugin.settings.error.call(this, data.meta.code, data.meta.error_message);
							        		
						        		}
						        	
						        	},
						        	error: function() {
						        	
						        		// execute error callback
						        		plugin.settings.error.call(this);
							        	
						        	}
						        });
			        		
				        		break;
				        		
			        		}
			        		
		        		}
			        	
		        	},
		        	error: function() {
		        	
		        		// execute error callback
						plugin.settings.error.call(this);
			        	
		        	}
	        	});
	        
	        });
        
        } else {
        	console.log('Both a client ID and username are required to use this plugin.');
        }
    }
    
})(jQuery);