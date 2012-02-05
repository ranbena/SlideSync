An javascript sync tool for displaying a talk video alongside a presentation.

Right now supports Youtube alongside Slideshare. Feel free to create or ask for the plugins you need.


Installation
------------

1. Fork the project or download the zip.
2. Create an HTML file based on "examples/index.html".
3. Load the plugins that match your video and presentation type. These can be loaded from "source/plugins".
4. Configure SlideSync.init to your plugins and the public ids.
5. Fill in the `script` array with the appropriate time signatures. Every signature means "next slide".

Example configuration
---------------------

    SlideSync.init({
    
        "video": {
            "plugin": Youtube,
            "id": "qspJiaIIIKI"
        },
        
        "slide": {
            "plugin": Slideshare,
            "id": "mobilewebappdev-120203041131-phpapp02"
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