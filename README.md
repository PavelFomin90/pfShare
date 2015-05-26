#Social Shares for images v 1.0


----------
## Social Networks
Social networks available for that moment
```
vk: vk.com
fb: facebook.com
tw: twitter.com
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
    
    title - title to push for share
    default : encodeURIComponent($("title").text()),
    
    description - description to push for share
    default : encodeURIComponent($("meta[name='description']").attr("content")),
    
    image - image to push for share 
    default : $("img").first().attr("src"), 
   
    customClasses - array of classes for addin to share buttons 
    default: [],
    
    socials - the array of selected social networks
    default: ['vk','fb','tw','gl']




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
This plugin create wrapper div for target elements with `class="share-wrapper"`
The share box have classes `box-share` for itself  and `button-share` and shortname of social network for icons, also share icons supported custom classes.


```plaintext
before:
<div class="img_wrapper">
    <img src="/awsome.jpg" />
</div>

after:
<div class="share_wrapper" data-id="123">
  <div class="img_wrapper">
      <img src="/awsome.jpg" />
  </div>
  <div class="box-share">
    <span class="button-share vk " data-type="vk">vk</span>
    <span class="button-share fb " data-type="fb">fb</span>
    <span class="button-share tw " data-type="tw">tw</span>
    <span class="button-share gl " data-type="gl">gl</span>
    <a href="#image123" name="image123"></a></div>
</div>
```
##Open Graph
That plugin generate share link with GET parameter 
```
?image=image_src
```

so you can dynamiclly generate og:image on server for facebook sharing correct work

example on php:
```php
    <meta property="og:image" content="<?php echo $_GET['image']; ?> /">
```
