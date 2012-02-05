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