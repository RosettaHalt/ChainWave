(function(ns) {
        
    // 画像のリスト
    var IMAGES = {
    };
    
    ns.EndScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            // ラベル
            this.fromJSON({
                children: [
                    {
                        type: "Label",
                        name: "scoreLabel",
                        x   : app.width/2,
                        y   : app.height/2,
                        width: 480,
                        height: 40,
                        text: "score : "+userData.score,
                        align: "center",
                        fontSize: 32
                    }
                ]
            });
            
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
