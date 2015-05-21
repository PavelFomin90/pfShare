#Social Shares for images v 0.3


----------
## Social Networks
Social networks available for that moment
```
vk: vk.com
fb: facebook.com
tw:twitter.com
gl: Google+
```
##Usage
You can use it in this way:
```javascript
$(el).pfShare([parametrs]);
```
The `<img>` you want to share must be in wrapper like that
```
<div class="img_wrapper">
    <img src="/awsome.jpg" />
</div>
```
##Parameters

    url - url to push for share
    default : window.location.protocol + "//" + window.location.hostname + window.location.pathname, 
    
    hash: - hash to push for share
    default : '' 
    
    title -  title to push for share
    default : encodeURIComponent($("meta[name=title]").attr("content")),
    
    description - description to push for share
    default : encodeURIComponent($("meta[name='description']").attr("content")),
    
    image - image to push for share 
    default : $("img").first().attr("src"), 
   
    customClasses - the string of classes for addin to share buttons 
    default: '',
    
    socials - the object of selected social networks
    default: {vk : true, fb : true, tw : true, gl : true}




You can change defaults options by pushing the object into function:
```javascript
$('.img_wrapper').pfShare({ url : "somesite.com"});
```
Also you can use data-attributes in your html:
```html
<div class="img_wrapper"  data-title="awsome image">
  <img src="/awsome.jpg" />
</div>
```

##HTML
This plugin create wrapper div for  target elements with `class="share-wrapper"`
The share box have classes `box-share` for itself  and `button-share` and shortname of social network, also share icons supported custom classes.


```plaintext
before:
<div class="img_wrapper">
    <img src="/awsome.jpg" />
</div>

after:
<div class="share_wrapper">
  <div class="img_wrapper">
      <img src="/awsome.jpg" />
  </div>
</div>
```
##Open Graph
That plugin generate share link with GET parameter 
```
?image=image_id
```

so you can dynamicly generate og:image on server for facebook sharing correct work

example on php:
```php
    <meta property="og:image" content="http://<?php echo $_SERVER['SERVER_NAME'] ?>/assets/img/image-<?php echo $_GET['image']; ?>.jpg" />
```
