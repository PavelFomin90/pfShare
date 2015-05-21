#Social Shares for images v 0.1


----------
##Usage
You can use it in this way:
```jQuery
$(el).pfShare(method, parametrs);
```
##Methods

```plaintext
'vk' - vk.com
'fb' - facebook.com
'tw' - tweet
'gl' - share to Google+
'appendButtons' - this method allow you to append social buttons to the image you want 
```

##Parametrs

    url - url to push for share
    default : window.location.protocol + "//" + window.location.hostname + window.location.pathname, 
    
    hash: - hash to push for share
    default : '' 
    
    title -  title to push for share
    default : encodeURIComponent($("meta[name=title]").attr("content")),
    
    description - description to push for share
    default : encodeURIComponent($("meta[name='description']").attr("content")),
    
    image - image to push for share 
    default : $("img").first().attr("src")

You can change defaults by pushing the object into function:
```
$('.vk').pfShare('vk', { url : "somesite.com"});
```
Also you can use data-attributes in your html:
```
<span class="button-share vk" data-title="awsome image">VK</span>
```

##HTML, parsing, url hashes
Method  `appendButtons` generate HTML appending it to selected element
generated HTML by default:
```html
        <div class="box-share">
          <span class="button-share vk">VK</span>
          <span class="button-share fb">FB</span>
          <span class="button-share tw">TW</span>
          <span class="button-share gl">GL</span>
          <a href="#image' + hash +'"></a>
        </div>
```
by now it's no method to change it, only in code, but it was planed to do

parsing for `image_id` also you can change in code
by default it:
```
self.parent().parent().find("img").attr("src").split("/").pop(-1).split("-").pop(-1).split(".")[0]
```
hash to HTML paste in the same way
##Open Graph
That plugin generate share link with GET parametr 
```
?image=image_id
```

so you can dynamicly generate og:image on server

example on php:
```php
    <meta property="og:image" content="http://<?php echo $_SERVER['SERVER_NAME'] ?>/assets/img/image-<?php echo $_GET['image']; ?>.jpg" />
```
