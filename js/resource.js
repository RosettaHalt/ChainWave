// リソースの読み込み
tm.preload(function(){
    tm.sound.SoundManager.add("decide", "sound/se/decide.wav");
    tm.sound.SoundManager.add("touch", "sound/se/touch.wav");
    tm.sound.SoundManager.add("clear", "sound/se/clear.wav");
});

var REVERSE_WAVE_IMAGE = (function(){
    var c = tm.graphics.Canvas();
    c.width = c.height = 256;
    c.setTransformCenter();
    c.strokeStyle = "white";
    c.lineWidth = 5;
    c.strokeCircle(0, 0, 48);

    return c;
})();

var TITLE_WAVE_IMAGE = (function(){
    var c = tm.graphics.Canvas();
    c.width = c.height = 512;
    c.setTransformCenter();
    c.strokeStyle = "white";
    c.lineWidth = 5;

    c.strokeCircle(0, 0, 192);

    return c;
})();