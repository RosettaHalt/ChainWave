(function(ns){
    ns.PauseScene = tm.createClass({
        superClass: tm.app.Scene,

        init: function(audio){
            this.superInit();
            this.interaction;

            this.filter = tm.app.Shape(app.width, app.height);
            this.filter.setPosition(app.width/2, app.height/2);
            this.filter.canvas.clearColor("rgba(0, 0, 0, 0.75)");
            this.addChild(this.filter);

            app.stop();

            this.audio = audio;
            if(this.audio){ this.audio.pause(); }
        },

        onfocus: function(){
            app.start();
        },

        onblur: function(){
            app.stop();
        },

        onmousedown: function(){
            this.filter.animation.addTween({
                prop: "alpha",
                begin: this.alpha,
                finish: 0.0,
                duration: 1000,
                onfinish: function() {
                    if(this.audio){ this.audio.play(); }
                    app.popScene();
                }.bind(this)
            });
        }
    });
})(window);