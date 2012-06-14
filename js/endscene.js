(function(ns) {
        
    // 画像のリスト
    var IMAGES = {
    };
    
    ns.EndScene = tm.createClass({
        superClass: tm.app.Scene,
    
        init: function(){
            this.superInit();
            
            var label = tm.app.Label(32,32);
            label.x = app.width/2;
            label.y = app.height/2;
            label.text = "score : "+userData.score;
            label.width = app.width;
            label.align = "center";
            this.addChild(label);

            var tweetButton = tm.twitter.TweetButton(
                "Score : {0}連鎖\n http://bit.ly/MsUcIt #ChainWave #tmlibjs".format(userData.score)
            );
            tweetButton.x = app.width/2;
            tweetButton.y = 480;
            this.addChild(tweetButton);
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
