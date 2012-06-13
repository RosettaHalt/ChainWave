/**
 * 波紋
 */
var Wave = tm.createClass({
    superClass: tm.app.CanvasElement,

    init: function(x, y, time, size, img) {
        this.superInit();
        this.x = x;
        this.y = y;
        this.plusScale = 0.8/30;

        this.particle = tm.app.Sprite(size, size);
        this.particle.setImage(img);
        this.particle.scaleX = this.particle.scaleY = 0.2;
        var self = this;
        this.particle.update = function(){
            this.scaleX += self.plusScale;
            this.scaleY += self.plusScale;
        }
        this.addChild(this.particle);
        this.fadeOut(time);
    },

    fadeOut: function(time) {
        this.animation.addTween({
            prop: "alpha",
            begin: 1,
            finish: 0,
            duration: time
        });
    },

    onanimationend: function() {
        this.remove();
    }
});