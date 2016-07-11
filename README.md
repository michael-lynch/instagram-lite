# Instagram Lite

A simple, lightweight jQuery plugin used to display a user's Instagram photos and videos.

*Note that you must be the owner of the Instagram account being displayed and that Instagram only allows you to show up to 20 pieces of media.*

<a href="http://michael-lynch.github.io/instagram-lite/" target="_blank">See a demo</a>

### Important Read

**This plugin requires a valid `access_token` issued by Instagram. To get an access token, login to the [Instagram Developer](https://www.instagram.com/developer/) site, create an app and hit this URL in your browser (replace `CLIENT-ID` with your actual client ID and `REDIRECT-URI` with your actual redirect URI):**

https://api.instagram.com/oauth/authorize/?client_id=CLIENT-ID&redirect_uri=REDIRECT-URI&response_type=token&scope=public_content

Instagram will redirect you to your redirect URL with the access token appended to it. It should look like this:

https://myredireturi.com?access_token=1730464.199554e.e561d1b801d74e35a1453110a44a09e8

Copy the `access_token` in the URL. This is what you'll need to use the plugin.

## Instructions

Include jQuery and the plugin in the head or footer of your page.

```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script src="/js/plugins/instagramLite.js"></script>
```

Create a list with an ID or class that will contain the user's Instagram photos.

```html
<ul class="instagram-lite"></ul>
```

Initialize the plugin targeting the class, ID or element and pass the function your access token.

```js
$('.instagram-lite').instagramLite({
	accessToken: 'XXXXXXXXXXXXXXXXXXXXX'
});
```

#### Required Properties

<ol>

<li>
accessToken: string
<br />A string that defines your access token provided by Instagram.
</li>

</ol>

#### Optional Properties

<ol>

<li>limit: integer
<br />An integer that indicates the amount of photos to be returned. If loadMore is set, the limit property will determine how many photos are loaded each time. (default: 10).
</li>

<li>list: boolean
<br />A boolean value that indicates whether or not to use list items (default: true).
</li>

<li>urls: boolean
<br />A boolean value that indicates whether or not the images should be linked to their page on Instagram (default: false).
</li>

<li>videos: boolean
<br />A boolean value that indicates whether or not videos should be displayed (default: false). <em><sup>*</sup>Note that videos are .mp4 and currently only work in webkit.</em>
</li>

<li>captions: boolean
<br />A boolean value that indicates whether or not the photo captions should be displayed (default: false).
</li>

<li>date: boolean
<br />A boolean value that indicates whether or not the date of when the photo was taken should be displayed (default: false).
</li>

<li>likes: boolean
<br />A boolean value that indicates whether or not the photo like count should be displayed (default: false).
</li>

<li>comments_count: boolean
<br />A boolean value that indicates whether or not the photo comment count should be displayed (default: false).
</li>

<li>error: function()
<br />A callback function that is triggered after the request if the request is not successful.
</li>

<li>success: function()
<br />A callback function that is triggered after the request if the request is sucessful.
</li>

</ol>

##### Example:

```js
$(function() {

	$('.instagram-lite').instagramLite({
		accessToken: 'XXXXXXXXXXXXXXXXXXXXX',
		list: false,
		urls: false,
		success: function() {
			console.log('The request was successful!');
		},
		error: function(errorCode, errorMessage) {
			console.log('There was an error with the request');
		}
	});
});
```		
