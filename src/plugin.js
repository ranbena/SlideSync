Function.prototype.inheritsFrom = function( parentClassOrObject ){ 
    this.prototype = new parentClassOrObject;
    this.prototype.constructor = this;
    this.prototype.parent = parentClassOrObject.prototype;
    
    return this;
}

// Plugin
function Plugin(){}

Plugin.prototype.register = function(){
    SlideSync.registerPlugin(this);
};


// VideoPlugin
function VideoPlugin(){
    this.type = SlideSync.PLUGIN.TYPES.VIDEO;
}
VideoPlugin.inheritsFrom(Plugin);

function SlidesPlugin(){
    this.type = SlideSync.PLUGIN.TYPES.SLIDES;
}
SlidesPlugin.inheritsFrom(Plugin);


