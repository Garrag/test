/**
 * Created by admin on 2015/12/10.
 */
(function () { //requestAni方法的兼容
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame =
            window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function (callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function () {
                    callback(currTime + timeToCall);
                },
                timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };

    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function (id) {
            clearTimeout(id);
        };
}());

var FileLoader = {
    count: 0,
    totalCount: 0,
    loadOneScript: function (url, callback) {
        $.getScript(url).done(function () {
            FileLoader.count++;
            if (FileLoader.count === FileLoader.totalCount) {
                callback();
            }
        });
    },
    loadJson: function (callback) {
        $.getJSON('project.json', function (data) {
            FileLoader.totalCount = data.fileList.length;
            if (FileLoader.totalCount <= 0) {
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
            var mp3Support, oggSupport;
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
            loader.soundFileExtn = oggSupport ? ".ogg" : mp3Support ? ".mp3" : undefined;
        }
    },

    loadImage: function (url) {
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        var image = new Image();
        image.src = url;
        image.onload = loader.itemLoaded;
        return image;
    },

    itemLoaded: function () {
        loader.loadedCount++;
        $('#loadingmessage').html('Loaded ' + loader.loadedCount + ' of ' + loader.totalCount);
        if (loader.loadedCount === loader.totalCount) {
            loader.loaded = true;
            $('#loadingscreen').hide();
            if (loader.onload) {
                loader.onload();
                loader.onload = undefined;
            }
        }
    }

};

/**
 * 游戏流程控制
 * @type {{init: Function, showLevelScreen: Function}}
 */
var game = {
    init: function () {
        levels.init();
        loader.init();
        mouse.init();
        $('.gamelayer').hide();
        $('#gamestartscreen').show(); //显示游戏开始层
        game.canvas = $('#gamecanvas')[0];
        game.context = game.canvas.getContext('2d');
    },
    showLevelScreen: function () {
        $('.gamelayer').hide();
        $('#levelselectscreen').show('slow'); //显示游戏开始层
    },

    mode: 'intro', //游戏阶段
    slingshotX: 140,
    slingshotY: 280,
    // Maximum panning speed per frame in pixels
    maxSpeed:3,
    // Minimum and Maximum panning offset
    minOffset:0,
    maxOffset:300,

    start: function () {
        $('.gamelayer').hide();
        $('#gamecanvas').show();
        $('#scorescreen').show();

        game.mode = "intro";
        game.offsetLeft = 0; //左偏移值
        game.ended = false;
        game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
    },

    handlePanning: function () {
        if (game.mode == "intro") {
            if (game.panTo(700)) {
                game.mode = "load-next-hero";
            }
        }
    },
    panTo: function (newCenter) {
        if (Math.abs(newCenter - game.offsetLeft - game.canvas.width / 4) > 0
            && game.offsetLeft <= game.maxOffset && game.offsetLeft >= game.minOffset) {

            var deltaX = Math.round((newCenter - game.offsetLeft - game.canvas.width / 4) / 2);
            if (deltaX && Math.abs(deltaX) > game.maxSpeed) {
                deltaX = game.maxSpeed * Math.abs(deltaX) / (deltaX);
            }
            game.offsetLeft += deltaX;
        } else {
            return true;
        }
        if (game.offsetLeft < game.minOffset) {
            game.offsetLeft = game.minOffset;
            return true;
        } else if (game.offsetLeft > game.maxOffset) {
            game.offsetLeft = game.maxOffset;
            return true;
        }
        return false;
    },
    animate: function () {
        game.handlePanning();
        //移动背景和前景
        game.context.drawImage(game.currentLevel.backgroundImage, game.offsetLeft / 4, 0, 640, 480, 0, 0, 640, 480);
        game.context.drawImage(game.currentLevel.foregroundImage, game.offsetLeft, 0, 640, 480, 0, 0, 640, 480);

        game.context.drawImage(game.slingshotImage, game.slingshotX - game.offsetLeft, game.slingshotY);
        game.context.drawImage(game.slingshotFrontImage, game.slingshotX - game.offsetLeft, game.slingshotY);

        //如果游戏没有结束, 继续刷新
        if (!game.ended) {
            game.animationFrame = window.requestAnimationFrame(game.animate, game.canvas);
        }
    }

};

//开始
$(window).load(function () {
    FileLoader.loadJson(function () {
        game.init();
    });
});