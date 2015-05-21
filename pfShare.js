/* ===========================================================
 * pfShare v 0.1
 * ===========================================================
 *
 * License: MIT
 *
 * Copyright 2015 Pavel Fomin.
 * ========================================================== */
(function( $ ){

        $.fn.pfShare = function(method, defaults) {

            var defOpt = $.extend( {//Default settigs and privat methods
                url:window.location.protocol + "//" + window.location.hostname + window.location.pathname,
                hash: '',
                title:encodeURIComponent($("meta[name=title]").attr("content")),
                description:encodeURIComponent($("meta[name='description']").attr("content")),
                image:$("img").first().attr("src")
            }, defaults);

            if ( methods[method] ) {
              return methods[method].call( this, defOpt);
            } else {
              $.error( "Метод с именем " +  method + " не существует" );
            }
        };



        var getParams = function(self,def){
          var param = {};
          param.url = self.data("url") || def.url;
          param.title = self.data("title") || def.title;
          param.description = self.data("descr") || def.description;
          param.image = self.data("image") || window.location.origin + self.parent().parent().find("img").attr("src") || def.image;
          param.image_pref = self.parent().parent().find("img").attr("src").split("/").pop(-1).split("-").pop(-1).split(".")[0];
          return param;
        }



  var methods = { // Public methods
     appendButtons : function ( defOpt ){
      self = $(this);
        var hash = self.parent().parent().find("img").attr("src").split("/").pop(-1).split("-").pop(-1).split(".")[0];
        var shareForm = ''+
        '<div class="box-share">' + 
          '<span class="button-share vk">VK</span>' + 
          '<span class="button-share fb">FB</span>' + 
          '<span class="button-share tw">TW</span>' + 
          '<span class="button-share gl">GL</span>' + 
          '<a href="#image' + hash +'"></a>'
        '</div>';
        self.append( shareForm );
        return this;
     },

     vk : function( defOpt ) {
        this.on("click",function(){
             var self = $(this);
             var def = defOpt;
             var params = getParams(self,def);
             var hash = "image" + params.image_pref;

             var send = "http://vk.com/share.php?";
             send += "url=" + params.url + "?image=" + params.image_pref + "%23" + hash; 
             send += "&title=" + params.title;
             send += "&description=" + params.description;
             send += "&image=" + params.image;
             console.log(send)
             window.open(send, "", "toolbar=0,status=0,width=626,height=436");
       })
      return this;
     },

     fb : function( defOpt ) { 
      this.on("click",function(){
             var self = $(this);
             var def = defOpt;
             var params = getParams(self,def);
             var hash = "image" + params.image_pref;
             var send = "http://facebook.com/share.php?s=100";
             send += "&p[url]=" + params.url + "?" + "image=" + params.image_pref  + "%23" + hash;
             send += "&p[title]=" + params.title;
             send += "&p[summary]=" + params.description;
             send += "&p[images][0]=" + params.image;
             window.open(send, "", "toolbar=0,status=0,width=626,height=436");
       });
      return this;
     },

     tw : function( defOpt ) { 
         this.on("click",function(){
             var self = $(this);
             var def = defOpt;
             var params = getParams(self,def);
             var hash = "image" + params.image_pref;
             var send = "http://twitter.com/share?";
                 send += "url=" + params.url + "?" + "image=" + params.image_pref  + "%23" +hash;
                 send += "&text=" + params.title;
                 send += "&counturl=" + params.url;
             window.open(send, "", "toolbar=0,status=0,width=626,height=436");
       });
      return this;
     },

     gl : function( defOpt ) {
      this.on("click",function(){
        var self = $(this);
        var def = defOpt;
        var params = getParams(self,def);
        var hash = "image" + params.image_pref;
        var send = "https://plus.google.com/share?hl=ru";
        send += "&url=" + params.url + "?" + "image=" + params.image_pref + "%23" +hash;
        window.open(send, "", "toolbar=0,status=0,width=626,height=436");
        return this;
      });
     }
  };
})( jQuery );
