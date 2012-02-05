//     SlideSync.js
//     (c) 2012 Ran Ben Aharon
//     SlideSync.js may be freely distributed under the MIT license.

var SlideSync = new function(){
    var script, plugins = {};

    this.PLUGIN = {
        TYPES: {
            VIDEO: "video",
            SLIDES: "slides"
        }
    };
        
    this.init = function(options){
        script = normalizeScript(options.script);
        
        // onload
        window.addEventListener("load", function(){
            options.video.elementId = "video";
            options.video.onChangeCallback = onVideoTimeUpdate;
            plugins.video.init(options.video);
            
            options.slides.elementId = "slides";
            plugins.slides.init(options.slides);
        }, false);
    };
    
    this.registerPlugin = function(plugin){
        plugins[plugin.type] = plugin;
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
        
        plugins.slides.update(slideNum);
    }
    
    function onSlideTimeUpdate(n){
        plugins.video.update(n-1);
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


