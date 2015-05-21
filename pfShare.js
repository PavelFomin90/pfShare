/* ===========================================================
 * pfShare v 0.2
 * ===========================================================
 *
 * License: MIT
 *
 * Copyright 2015 Pavel Fomin.
 * ========================================================== */
(function( $ ){

        $.fn.pfShare = function(options) {

            var options = $.extend( {//Default settigs and privat methods
                url:window.location.protocol + "//" + window.location.hostname + window.location.pathname,
                hash: '',
                title:encodeURIComponent($("meta[name=title]").attr("content")),
                description:encodeURIComponent($("meta[name='description']").attr("content")),
                image:$("img").first().attr("src"),
                customClasses : '',
            }, options);

            pluginTarget = $(this);
            targetClass = "." + pluginTarget[0].className;
            
            function init(){

                pluginTarget.wrap('<div class="share-wrapper"></div>');
                appendButtons();
                setHandlers(options);

            };

          var appendButtons = function (){
                pluginTarget.each(function(){
                    var anchor = $(this).getImagePref();
                    var shareForm = ''+
                        '<div class="box-share">' + 
                            '<span class="button-share vk ' + options.customClasses + '" data-type="vk">VK</span>' + 
                            '<span class="button-share fb ' + options.customClasses + '" data-type="fb">FB</span>' + 
                            '<span class="button-share tw ' + options.customClasses + '" data-type="tw">TW</span>' + 
                            '<span class="button-share gl ' + options.customClasses + '" data-type="gl">GL</span>' + 
                            '<a href="#image' + anchor +'"></a>'
                        '</div>';
                    $(this).append( shareForm );
                });
             }

             init();
        };

        var setHandlers = function(options){

            $(".button-share").on("click",function(){
                var type = $(this).data("type");
                shareMethods[type].call(this,options);
            })
        };

        var getParams = function(self,def){
          var param = {};
          console.log(targetClass);
          param.url = self.closest(targetClass).data("url") || def.url;
          param.title = self.closest(targetClass).data("title") || def.title;
          param.description = self.closest(targetClass).data("descr") || def.description;
          param.image = self.closest(targetClass).data("image") || window.location.origin + self.closest(".share-wrapper").find("img").attr("src") || def.image;
          param.image_pref = self.getImagePref();
          console.log(param);
          return param;
        };

        $.fn.getImagePref = function(){
            imagePref = $(this).closest(".share-wrapper").find("img").attr("src").split("/").pop(-1).split("-").pop(-1).split(".")[0];
            return imagePref;
        }

    var shareMethods = {
         vk : function( options ) {
                var self = $(this);
                var def = options;
                var params = getParams(self,def);
                var hash = "image" + params.image_pref;

                var send = "http://vk.com/share.php?";
                send += "url=" + params.url + "?image=" + params.image_pref + "%23" + hash; 
                send += "&title=" + params.title;
                send += "&description=" + params.description;
                send += "&image=" + params.image;
                console.log(send)
                window.open(send, "", "toolbar=0,status=0,width=626,height=436");
                return this;
         },

         fb : function( options ) {
                var self = $(this);
                var def = options;
                var params = getParams(self,def);
                var hash = "image" + params.image_pref;

                var send = "http://facebook.com/share.php?s=100";
                send += "&p[url]=" + params.url + "?" + "image=" + params.image_pref  + "%23" + hash;
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
                var hash = "image" + params.image_pref;
                var send = "http://twitter.com/share?";
                    send += "url=" + params.url + "?" + "image=" + params.image_pref  + "%23" +hash;
                    send += "&text=" + params.title;
                    send += "&counturl=" + params.url;
                window.open(send, "", "toolbar=0,status=0,width=626,height=436");
                return this;
         },

        gl : function( options ) {
            var self = $(this);
            var def = options;
            var params = getParams(self,def);
            var hash = "image" + params.image_pref;

            var send = "https://plus.google.com/share?hl=ru";
            send += "&url=" + params.url + "?" + "image=" + params.image_pref + "%23" +hash;
            window.open(send, "", "toolbar=0,status=0,width=626,height=436");
            return this;
         }
    };
})( jQuery );
