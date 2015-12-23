/**
 * Created by admin on 2015/12/10.
 */
$(window).load(function () {
    FileLoader.loadJson(function () {
        game.init();
    });
});

/**
 * 游戏流程控制
 * @type {{init: Function, showLevelScreen: Function}}
 */
var game = {
    init: function () {
        levels.init();
        loader.init();
        $('.gamelayer').hide();
        $('#gamestartscreen').show(); //显示游戏开始层
        game.canvas = $('#gamecanvas')[0];
        game.context = game.canvas.getContext('2d');
    },
    showLevelScreen: function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow'); //显示游戏开始层
    }
};

var FileLoader = {
    count: 0,
    totalCount: 0,
    loadOneScript: function (url, callback) {
        $.getScript(url).done(function(){
            FileLoader.count ++;
            if(FileLoader.count === FileLoader.totalCount){
                callback();
            }
        });
    },
    loadJson: function (callback) {
        $.getJSON('project.json', function (data) {
            FileLoader.totalCount = data.fileList.length;
            if(FileLoader.totalCount <= 0){
                callback();
                return;
            }
            data.fileList.forEach(function (item) {
                FileLoader.loadOneScript(item, callback);
            });
        });
    }
};

var loader = {
    loaded: true,
    loadedCount: 0,
    totalCount: 0,
    init: function () {
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');
        if (audio.canPalyType) {
            // TODO 检测声音
            // check for sound support
            var mp3Support,oggSupport;
            var audio = document.createElement('audio');
            if (audio.canPlayType) {
                // Currently canPlayType() returns: "", "maybe" or "probably"
                mp3Support = "" != audio.canPlayType('audio/mpeg');
                oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
            } else {
                //The audio tag is not supported
                mp3Support = false;
                oggSupport = false;
            }
            // Check for ogg, then mp3, and finally set soundFileExtn to undefined
            loader.soundFileExtn = oggSupport?".ogg":mp3Support?".mp3":undefined;
        }
    },

    loadImage:function(url){
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = new Image();
        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },

    itemLoaded:function(){
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded '+loader.loadedCount+' of '+loader.totalCount);
        if (loader.loadedCount === loader.totalCount){
            loader.loaded = true;
            $('#loadingscreen').hide();
            if(loader.onload){
                loader.onload();
                loader.onload = undefined;
            }
        }
    }

};