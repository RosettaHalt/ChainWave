(function(ns){
    ns.MainScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            this.MAX_CIRCLE = 100;
            this.noWaveTime = 0;
            this.touchFlag = true;
            userData.score = 0;
            
            this.circle = [];
            for(var i = 0; i < this.MAX_CIRCLE; i++){
                this.circle[i] = Circle(Math.rand(16, app.width-16), Math.rand(16, app.height-16), 32, 32, "hsla({0}, 50%, 80%, 0.75)".format(Math.rand(0, 360)));
                this.addChild(this.circle[i]);
            }
        },
    
        update: function(){
            if( this.touchFlag == true && app.pointing.getPointingEnd() == true ){
                this.touchFlag = false;
                this.newWave(app.pointing.x, app.pointing.y);
            }
            
            if(this.touchFlag == false){ ++this.noWaveTime; }
            if(this.noWaveTime > 100){
                this.addChild( tm.fade.FadeOut(
                    app.width, app.height, "#000", 1000, function(){
                        app.replaceScene(EndScene());
                    })
                );
            }
        },
        
        newWave: function(x,y){
            tm.sound.SoundManager.get("touch").play();
            var wave = Wave(x, y, 1000, 256, REVERSE_WAVE_IMAGE);
            this.addChild(wave);
            
            var self = this;
            wave.update = function(){
                self.noWaveTime = 0;
                for(var i = 0; i < self.MAX_CIRCLE; i++){
                    if( self.circle[i].visible != false && self.isHitCircle( x, y, 48*this.particle.scaleX, self.circle[i].x, self.circle[i].y, 8 ) ){
                        self.circle[i].visible = false;
                        self.newWave(self.circle[i].x, self.circle[i].y);
                        ++userData.score;
        			}
                }
            }
        },
        
        isHitCircle: function(xc1, yc1, r1, xc2, yc2, r2){
        	if( Math.pow(xc1-xc2,2) + Math.pow(yc1-yc2,2) <= Math.pow(r1+r2,2) ){
        		return true;
        	}
        	return false;
        },
                
        // ポーズ画面 : 別タブへ切り替わった時 / Tabキーを押した時
        onblur: function(){
            app.pushScene(PauseScene(this.bgm));
        }
    });
})(window);


var Circle = tm.createClass({
    superClass: tm.app.CanvasElement,

    init: function(x, y, w, h, color){
        this.superInit(w, h);
        this.x = x;
        this.y = y;
        
        this.radius = 8;
        this.fillStyle = color;
        this.alpha = 0.75;
    },
    
    draw: function(c){
        c.fillCircle(0, 0, this.radius);
        c.strokeStyle = "white";
        c.lineWidth = 2;
        c.strokeCircle(0, 0, this.radius+1);
    },
});
