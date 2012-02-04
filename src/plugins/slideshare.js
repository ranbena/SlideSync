var SlideSync = new function(){
    var script, video, slide;
    
    this.init = function(cfg){
        script = normalizeScript(cfg.script);
        video = new Youtube();
        slide = new Slideshare();
        
        window.addEventListener("load", function(){
            cfg.video.onChangeCallback = onVideoTimeUpdate;
            video.init(cfg.video);
            
            cfg.slide.onChangeCallback = onSlideTimeUpdate;
            slide.init(cfg.slide);
        }, false);
    };
    
    function onVideoTimeUpdate(newTime){
        var slideNum = script[0];
        for (var i=0, len=script.length; i<len; i++){
            if (i+1 != len){
                if (newTime <= script[i+1]){
                    slideNum = i+1;
                    break;
                }
            }
            else{
                slideNum = i+1;
            }
        }
        
        slide.update(slideNum);
    }
    
    function onSlideTimeUpdate(n){
        video.update(n-1);
    }
    
    function normalizeScript(origScript){
        var newScript = [];
        origScript.forEach(function(time){
            newScript.push(convertToSec(time));
        });
        return newScript;
    }
    
    function convertToSec(time){
        var split = time.split(":"),h = 0, m = 0, s = 0;
        
        switch (split.length){
            case 1:
                s = time;
                break;
            case 2:
                m = split[0];
                s = split[1];
                break;
            case 3:
                h = split[0];
                m = split[1];
                s = split[2];
        }
        
        h = parseInt(h) * 60 * 60;
        m = parseInt(m) * 60;
        s = parseInt(s);
        
        return h + m + s;
    }
};

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

function Slideshare(){
    var player, statusInterval, onChangeCallback;
    
    this.init = function(cfg){
        onChangeCallback = cfg.onChangeCallback || function(){};
        
        var params = { allowScriptAccess: "always" };
        var atts = { id: "ssplayer" };
        var flashvars = { doc : cfg.id };
    
        swfobject.embedSWF("http://static.slidesharecdn.com/swf/ssplayer2.swf"
                 ,"ssplayer","598","480","8",null,flashvars,params, atts);
                 
        player = document.getElementById("ssplayer");
    };
    
    this.update = function(n){
        player.jumpTo(n);
    };
}