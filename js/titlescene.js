(function(ns) {
        
    var LABELS = {
        "scoreLabel": {
            "type": "Label",
            "name": "scoreLabel",
            "x": 240,
            "y": 360,
            "width": 480,
            "height": 40,
            "text": "Chain Wave",
            "align": "top",
            "fontSize": 32,
        }
    };
    
    ns.TitleScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            // ラベル
            for(var key in LABELS){
                var value = LABELS[key];
                var label = tm.app.Label(value.width, value.height);
                label.width = value.width;
                label.height = value.height;
                label.position.set(value.x, value.y);
                label.text = value.text;
                label.align = value.align;
                label.fontSize = value.fontSize;
                this[key] = label;
                this.addChild(label);
            }
        },
    
        update: function(){
            if( app.pointing.getPointingEnd() == true ){
                var wave = Wave(this.scoreLabel.x*1.5, this.scoreLabel.y, 1500, 512, TITLE_WAVE_IMAGE);
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