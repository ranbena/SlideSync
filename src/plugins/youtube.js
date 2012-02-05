function Youtube(){
    var player, statusInterval, onChangeCallback;
    
    // onReady
    window.onYouTubePlayerReady = function(playerId) {
      player = document.getElementById("myytplayer");
      player.addEventListener("onStateChange", "onytplayerStateChange");
    };
    
    // onStateChange
    window.onytplayerStateChange = function(newState) {
       if (newState === 1){
           onPlay();
       } else {
           onStop();
       }
    };

    this.init = function(cfg){
        onChangeCallback = cfg.onChangeCallback || function(){};
        
        var params = { allowScriptAccess: "always" };
        var atts = { id: "myytplayer" };
        swfobject.embedSWF("http://www.youtube.com/v/"+cfg.id+"?enablejsapi=1&playerapiid=ytplayer&version=3",
                                   "ytapiplayer", "425", "356", "8", null, null, params, atts);
    };
    
    this.update = function(time){
        player.seekTo(time, true);
    };
    
    function onPlay(){
        statusInterval = setInterval(function(){
            onChangeCallback(player.getCurrentTime());
        }, 1000);
    }
    
    function onStop(){
        clearInterval(statusInterval);
    }
}