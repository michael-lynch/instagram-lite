#Instagram Lite

A simple, lightweight jQuery plugin used to display a user's Instagram photos.

<a href="http://michael-lynch.github.io/instagram-lite/" target="_blank">See a demo</a>

##Instructions

Include jQuery and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    
<script src="/js/plugins/instagramLite.js"></script>
```
    
Create a list with an ID or class that will contain the user's Instagram photos.

```html
<ul class="instagram-lite"></ul>
```
    
Initialize the plugin targeting the class, ID or element and pass the function your client ID (api key) and username. 

```js
$('.instagram-lite').instagramLite({
	clientID: 'XXXXXXXXXXXXXXXXXXXXX',
	username: 'yourusername'
});
```

####Required Properties

<ol>

<li>
clientID: string
<br />A string that defines your client ID provided by Instagram.
</li>

<li>username: string
<br />A string that defines the username of the user you want to retrieve Instagram photos from. 
</li>

</ol>
	
####Optional Properties

<ol>

<li>limit: integer
<br />An integer that indicates the limit of photos to be returned (default: 10).
</li>

<li>list: boolean
<br />A boolean value that indicates whether or not to use list items (default: true).
</li>

<li>urls: boolean
<br />A boolean value that indicates whether or not the images should be linked to their page on Instagram (default: true).
</li>

<li>error: function(errorCode, errorMessage)
<br />A callback function that is triggered after the request if the request is not sucessful. If Instagram returns an error, the error code and error message will be passed to this callback function.
</li>

<li>success: function()
<br />A callback function that is triggered after the request if the request is sucessful.
</li>

</ol>

#####Example:

```js
$(function() {
	
	$('.instagram-lite').instagramLite({
		clientID: 'XXXXXXXXXXXXXXXXXXXXX',
		username: 'yourusername',
		list: false,
		urls: false,
		error: function(errorCode, errorMessage) {
		
			console.log('There was an error with the request');
			
			if(errorCode && errorMessage) {
				console.log(errorCode +': '+ errorMessage);
			}
		}
		success: function() {
			console.log('The request was successful!');
		}
	});
		
});
```		