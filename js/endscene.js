(function(ns) {
        
    var LABELS = {
        "scoreLabel": {
            "type": "Label",
            "name": "scoreLabel",
            "x": 240,
            "y": 360,
            "width": 480,
            "height": 40,
            "text": 0,
            "align": "center",
            "fontSize": 32,
        }
    };
    
    ns.EndScene = tm.createClass({
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
            this.scoreLabel.text = "score : "+userData.score;
            
            // ツイートボタン
            var msg = tm.social.Twitter.createURL({
                type: "tweet",
                text: "Score : {0}連鎖\n".format(userData.score),
                hashtags: "ChainWave,tmlibjs",
                url: "http://bit.ly/MsUcIt",
            });
            var tweetButton = tm.app.iPhoneButton(120, 60, "black");
            tweetButton.setPosition(app.width/2, 480);
            tweetButton.label.text = "Tweet";
            this.addChild(tweetButton);
            tweetButton.onpointingstart = function() {
                window.open(msg, "_self");
            };
        },
    
        update: function(){
            if( app.pointing.getPointingEnd() == true ){
                
                this.addChild( tm.fade.FadeOut(
                    app.width, app.height, "#000", 1000, function() {
                        app.replaceScene(TitleScene());
                    })
                );
            }
        },

        // ポーズ画面 : 別タブへ切り替わった時 / Ttbキーを押した時
        onblur: function() {
            app.pushScene(PauseScene());
        }
    });
})(window);
