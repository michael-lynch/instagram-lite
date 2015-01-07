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
            videos: false,
            urls: false,
            captions: false,
            date: false,
            likes: false,
            max_id: null,
            loadMore: null,
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
        	$(plugin.settings.loadMore).on('click',function(e){
	        	e.preventDefault();
	        	self.loadContent();
	        });
        } 
    },
    
    getMaxId = function(items){
    
    	// return id of last item
    	return items[items.length-1].id;
    },
    
    formatCaption = function(caption) {
    
    	var words = caption.split(' '),
    		newCaption = '';
    	
    	for(var i = 0; i < words.length; i++) {
    	
    		//console.log(words[i][0]);
    		
    		var word;
	    	
	    	if(words[i][0] == '@') {
		    	var a = '<a href="http://twitter.com/'+words[i].replace('@', '').toLowerCase()+'" target="_blank">'+words[i]+'</a>';
		    	word = a;
		    } else if(words[i][0] == '#') {
		    	var a = '<a href="http://twitter.com/hashtag/'+words[i].replace('#', '').toLowerCase()+'" target="_blank">'+words[i]+'</a>';
		    	word = a;
	    	} else {
		    	word = words[i]
	    	}

	    	newCaption += word + ' ';
	    	
    	}
    
    	return newCaption;
	    
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
	
		        		if(data.data.length) {
		        	
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
							        	
							        		console.log(data);
							        		
							        		// if success status
							        		if(data.meta.code === 200 && data.data.length) {
												
								        		// for each piece of media returned
								        		for(var i = 0; i < data.data.length; i++) {
								        		
								        			// define media namespace
								        			var thisMedia = data.data[i],
								        				item;
								        			
								        			// if media type is image
								        			if(thisMedia.type === 'image') {
								        			
									        			// construct image
									        			item = '<img class="il-photo__img" src="'+thisMedia.images.standard_resolution.url+'" alt="Instagram Image" data-filter="'+thisMedia.filter+'" />';
	
									        			// if url setting is true
									        			if(plugin.settings.urls) {
									        			
									        				item = '<a href="'+thisMedia.link+'" target="_blank">'+item+'</a>';
										        			
									        			}
									        			
									        			if(plugin.settings.captions || plugin.settings.date || plugin.settings.likes) {
										        			item += '<div class="il-photo__meta">';
									        			}
									        			
									        			// if caption setting is true
									        			if(plugin.settings.captions && thisMedia.caption) {
									        			
									        				item += '<div class="il-photo__caption" data-caption-id="'+thisMedia.caption.id+'">'+self.formatCaption(thisMedia.caption.text)+'</div>';
										        			
									        			}
									        			
									        			// if date setting is true
									        			if(plugin.settings.date) {
									        			
									        				var date = new Date(thisMedia.created_time * 1000),
									        					day = date.getDate(),
																month = date.getMonth() + 1,
																year = date.getFullYear(),
																hours = date.getHours(),
																minutes = date.getMinutes(),
																seconds = date.getSeconds();
																
															date = month +'/'+ day +'/'+ year;
									        			
									        				item += '<div class="il-photo__date">'+date+'</div>';
										        			
									        			}
									        			
									        			// if likes setting is true
									        			if(plugin.settings.likes) {
									        			
									        				item += '<div class="il-photo__likes">'+thisMedia.likes.count+'</div>';
										        			
									        			}
									        			
									        			if(plugin.settings.captions || plugin.settings.date || plugin.settings.likes) {
										        			item += '</div>';
									        			}

								        			}
								        			
								        			if(thisMedia.type === 'video' && plugin.settings.videos) {
								        				
								        				if(thisMedia.videos) {
								        				
								        					var src;
								        				
								        					if(thisMedia.videos.standard_resolution) {
								        					
								        						src = thisMedia.videos.standard_resolution.url;
									        					
								        					} else if(thisMedia.videos.low_resolution) {
								        					
								        						src = thisMedia.videos.low_resolution.url;
									        					
								        					} else if(thisMedia.videos.low_bandwidth) {
								        					
								        						src = thisMedia.videos.low_bandwidth.url;
									        					
								        					}
								        					
								        					item = '<video poster="'+thisMedia.images.standard_resolution.url+'" controls>';
								        					
								        					item += '<source src="'+src+'" type="video/mp4;"></source>';
								        					
								        					item += '</video>';
									        				
								        				}
								        			}
								        			
								        			// if list setting is true
								        			if(plugin.settings.list) {
								        			
								        				// redefine item with wrapping list item
								        				item = '<li class="il-item" data-instagram-id="'+thisMedia.id+'">'+item+'</li>';
								        			}

								        			// append image
								        			el.append(item);
								        			
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
							        	
							        		// recent media ajax request failed
							        		// execute error callback
							        		plugin.settings.error.call(this);
								        	
							        	}
							        });
				        		
					        		break;
					        		
				        		}
				        		
			        		}
		        		
		        		} else {
		        		
		        			// error finding username
		        			// execute error callback
							plugin.settings.error.call(this);
			        		
		        		}
			        	
		        	},
		        	error: function() {
		        	
		        		// search username ajax request failed
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