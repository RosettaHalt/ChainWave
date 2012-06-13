
(function(ns) {
        
    // 画像のリスト
    var IMAGES = {
    };
    
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            this.label = tm.app.Label(32,32);
            this.label.x = app.width/2;
            this.label.y = app.height/2;
            this.label.text = "Chain Wave";
            this.label.width = app.width
            this.addChild(this.label);
        },
    
        update: function(){
            if( app.pointing.getPointingEnd() == true ){
                var wave = Wave(this.label.x*1.5, this.label.y, 1500, 512, TITLE_WAVE_IMAGE);
                wave.plusScale = 0.02;
                this.addChild(wave);

                this.addChild( tm.fade.FadeOut(
                    app.width, app.height, "#000", 3000, function() {
                        app.replaceScene(MainScene());
                    })
                );
            }
        },
    
        // ポーズ画面 : 別タブへ切り替わった時 / Ttbキーを押した時
        onblur: function() {
            app.pushScene(PauseScene(this.op));
        }
    });
    
})(window);