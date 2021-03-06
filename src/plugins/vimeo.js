function Vimeo(){
    var player, statusInterval;
    
    var options = {
        "width": 425,
        "height": 356
    };
    
    this.name = "vimeo";
        
    // onReady
    window.vimeo_player_loaded = function() {
        player = document.getElementById("vimeoplayer");
        player.api_addEventListener("playProgress", "onVideoPlayProgress");
    };
    
    window.onVideoPlayProgress = onPlayProgress;

    this.init = function(_options){
        for (var key in _options){
            options[key] = _options[key];
        }
        
        var wrapperEl = document.getElementById(options.elementId);
 
        swfobject.embedSWF(
            "http://vimeo.com/moogaloop.swf?clip_id="+options.id+"&amp;server=vimeo.com&amp;show_title=0&amp;show_byline=0&amp;show_portrait=0&amp;color=00adef&amp;fullscreen=1&amp;autoplay=0&amp;loop=0",
            options.elementId,
            options.width,
            options.height,
            "10",
            null,
            { api: "1" },
            { allowScriptAccess: "always", allowfullscreen: "true"}, // params
            { id: "vimeoplayer" } // attributes
        );
    };
    
    this.update = function(time){
        player.seekTo(time, true);
    };
    
    function onPlayProgress(data){
        options.onChangeCallback(data.seconds);
    }
}
// inheret
Vimeo.inheritsFrom(VideoPlugin);

// instance
var vimeo = new Vimeo();
vimeo.register();
