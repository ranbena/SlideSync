function Slideshare(){
    var player;
    
    var options = {
        "width": 598,
        "height": 480,
        "swf": "http://static.slidesharecdn.com/swf/ssplayer2.swf"
    };
    
    this.name = "slideshow";
    
    this.init = function(_options){        
        for (var key in _options){
            options[key] = _options[key];
        }
        
        swfobject.embedSWF(
            options.swf,
            options.elementId,
            options.width,
            options.height,
            "8",
            null,
            { doc : options.doc }, //flashvars
            { allowScriptAccess: "always", allowfullscreen: "true"}, // params
            { id: options.elementId } // attributes
        );
                 
        player = document.getElementById(options.elementId);
    };
    
    this.update = function(n){
        player.jumpTo(n);
    };
}

// inheret
Slideshare.inheritsFrom(SlidesPlugin);

// instance
var slideshare = new Slideshare();
slideshare.register();
