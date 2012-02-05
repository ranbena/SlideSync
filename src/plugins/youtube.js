function Youtube(){
    var player, statusInterval;
    
    var options = {
        "width": 425,
        "height": 356
    };
    
    this.name = "youtube";
        
    // onReady
    window.onYouTubePlayerReady = function() {
        player = document.getElementById("myytplayer");
        player.addEventListener("onStateChange", "onVideoStatusChanged");
    };
    
    // onStateChange
    window.onVideoStatusChanged = onStatusChanged;

    this.init = function(_options){
        for (var key in _options){
            options[key] = _options[key];
        }
        
        swfobject.embedSWF(
            "http://www.youtube.com/v/"+options.id+"?enablejsapi=1&playerapiid=ytplayer&version=3",
            options.elementId,
            options.width,
            options.height,
            "8",
            null,
            null,
            { allowScriptAccess: "always", allowfullscreen: "true"}, // params
            { id: "myytplayer" } // attributes
        );
    };
    
    this.update = function(time){
        player.seekTo(time, true);
    };
    
    function onStatusChanged(newState) {
        if (newState === 1){
            onPlay();
        } else {
            onStop();
        }
    };
    
    function onPlay(){
        statusInterval = setInterval(function(){
            options.onChangeCallback(player.getCurrentTime());
        }, 1000);
    }
    
    function onStop(){
        clearInterval(statusInterval);
    }
}
// inheret
Youtube.inheritsFrom(VideoPlugin);

// instance
var youtube = new Youtube();
youtube.register();
