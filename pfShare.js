/* ===========================================================
 * pfShare v 1.1
 * ===========================================================
 *
 * License: MIT
 *
 * Copyright 2015 Pavel Fomin.
 * ========================================================== */
(function( $ ){

    $.fn.pfShare = function(options) {

       var options = $.extend( {//Default settigs and privat methods
            url: getDefault.url(),
            title: getDefault.title(),
            description: getDefault.descr(),
            image: getDefault.image(),
            customClasses : [],
            socials : ['vk','fb','tw','gl']
        }, options);

       options.pluginTarget = $(this);
       options.socialInWork = [];

        init(options);
    };




    var init = function (options){

        initSocials(options);

        if(options.socialInWork.length > 0){
            makeView(options);
            setHandlers(options);
        } else {
            console.error("No socials selected!");
        }
    };

   var getDefault = {
        url : function(){
            var output = window.location.protocol + "//" + window.location.hostname + window.location.pathname;
            return output
        },
        title : function(){
            var output = encodeURIComponent($("title").text()) || "Title is not set!";
            return output;
        },

        descr : function(){
            var output = encodeURIComponent($("meta[name='description']").attr("content")) || "Description is not set"
            return output;
        },
        image : function(){
            var output = encodeURIComponent($("meta[name='og:image']").attr("content")) || $("img").first().attr("src");
            return output;
        }
    };

    var initSocials = function(options){
        options.socials.forEach(function(item, i){
            if(shareMethods[item]){
                options.socialInWork[i] = item;
            };
        });
    };

    var makeView = function (options){
        options.pluginTarget.each(function( i ){
            var shareForm = '<div class="box-share">';
            var socials = options.socialInWork;
            var customClasses = options.customClasses.join(" ");
            $(this).wrap('<div class="share-wrapper" data-id="'+ i +'"></div>');
                socials.forEach(function(social){
                    shareForm += '<span class="button-share ' + social + ' ' + options.customClasses + '" data-type="'+ social + '"></span>';
                });
                shareForm += '<a href="#image' + i +'" name="image'+ i + '"></a>'
                shareForm += '</div>';
            $(this).closest(".share-wrapper").append( shareForm );
        });
    };

    var setHandlers = function(options){
        $(".button-share").on("click",function(){
            var type = $(this).data("type");
            shareMethods[type].call(this,options);
        });
    };

    var getParams = function(self,def){
      var param = {};
      var getTargetClass = function(){
           var className;
           if(def.pluginTarget[0].className){
                className = "." + def.pluginTarget[0].className;
                return className
           } else{
             return false
           }
      }
      var targetClass = getTargetClass();
      var imageForShare = function(){
            var imageSrc = self.closest(".share-wrapper").find("img").attr("src");

            if(imageSrc.indexOf(window.location.origin) !== -1){
                return imageSrc;
            } else {
                imageSrc = window.location.origin + imageSrc;
                return imageSrc;
            }
      };
      var infoDataAttr = function(type){
            if (targetClass){
               return self.closest(targetClass).data(type);
            } else { return false}
      }

      param.url = infoDataAttr("url") || def.url;
      param.title = infoDataAttr("title") || def.title;
      param.description = infoDataAttr("descr") || def.description;
      param.image = infoDataAttr("image") || imageForShare() || def.image;
      param.image_id = getImageId(self);
      return param;
    };

    var getImageId = function( self ){
        imageId = self.closest(".share-wrapper").data("id");
        return imageId;
    }

    var getHash = function(img_id){
        var hash = "image" + img_id;
        return hash;
    }

    var shareMethods = {
         vk : function( options ) {
                var self = $(this);
                var def = options;
                var params = getParams(self,def);
                var hash = getHash(params.image_id);

                var send = "http://vk.com/share.php?";
                send += "url=" + params.url + "?image=" + params.image + "%23" + hash; 
                send += "&title=" + params.title;
                send += "&description=" + params.description;
                send += "&image=" + params.image;
                window.open(send, "", "toolbar=0,status=0,width=626,height=436");
                return this;
            },

         fb : function( options ) {
                var self = $(this);
                var def = options;
                var params = getParams(self,def);
                var hash = getHash(params.image_id);

                var send = "http://facebook.com/share.php?s=100";
                send += "&p[url]=" + params.url + "?" + "image=" + params.image  + "%23" + hash;
                send += "&p[title]=" + params.title;
                send += "&p[summary]=" + params.description;
                send += "&p[images][0]=" + params.image;
                window.open(send, "", "toolbar=0,status=0,width=626,height=436");
                return this;
            },

         tw : function( options ) {
                var self = $(this);
                var def = options;
                var params = getParams(self,def);
                var hash = getHash(params.image_id);

                var send = "http://twitter.com/share?";
                    send += "url=" + params.url + "?" + "image=" + params.image  + "%23" +hash;
                    send += "&text=" + params.title;
                    send += "&counturl=" + params.url;
                window.open(send, "", "toolbar=0,status=0,width=626,height=436");
                return this;
            },

        gl : function( options ) {
            var self = $(this);
            var def = options;
            var params = getParams(self,def);
            var hash = getHash(params.image_id);

            var send = "https://plus.google.com/share?hl=ru";
            send += "&url=" + params.url + "?" + "image=" + params.image + "%23" +hash;
            window.open(send, "", "toolbar=0,status=0,width=626,height=436");
            return this;
            }
    };
})( jQuery );
