An javascript sync tool for displaying a talk video alongside a presentation.

Right now supports Youtube alongside Slideshare. Feel free to create or ask for the plugins you need.


Installation
------------

1. Fork the project or download the zip.
2. Create an HTML file based on "examples/index.html".
3. [Configure](https://github.com/ranbena/SlideSync/wiki/Plugins) your chosen plugins.
4. Fill in the `script` array with the appropriate time signatures. Every signature means "next slide".

Example configuration
---------------------

    SlideSync.init({
    
        "video": {
            "plugin": Youtube,
            "id": "qspJiaIIIKI"
        },
        
        "slide": {
            "plugin": Slideshare,
            "doc": "mobilewebappdev-120203041131-phpapp02"
        },
        
        "script": [
            "0:00",
            "1:35",
            "1:42",
            "5:15",
            "5:20",
            "6:04",
            "6:48",
            "7:47",
            "10:34",
            "10:54",
            "11:10"                    
        ]    
        
    });
    
Roadmap
-------

1. More plugins on demand.
2. Detecting presentation navigation and moving video accordingly.
3. Alternative `script` configuration enabling to set a slide number to a time signature.
4. Using inheretance for video and slide classes.