/**
 * Created by admin on 2015/12/10.
 */
$(window).load(function () {
    jsLoader.loadJson(function () {
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

/**
 * js文件加载器
 * @type {{count: number, totalCount: number, loadOneScript: Function, loadJson: Function}}
 */
var jsLoader = {
    count: 0,
    totalCount: 0,
    loadOneScript: function (url, callback) {
        var script = document.createElement("script");
        script.type = "text/javascript";
        // IE
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    if (jsLoader.count == jsLoader.totalCount) {
                        callback();
                    } else {
                        jsLoader.count++;
                    }
                }
            };
        } else { // others
            script.onload = function () {
                if (jsLoader.count == jsLoader.totalCount) {
                    callback();
                } else {
                    jsLoader.count++;
                }
            };
        }
        script.src = url;
        document.body.appendChild(script);
    },
    loadJson: function (callback) {
        $.getJSON('project.json', function (data) {
            jsLoader.totalCount = data.fileList.length - 1;
            data.fileList.forEach(function (item) {
                jsLoader.loadOneScript(item, callback);
            });
        });
    }
};

var loader = {
    loaded: true,
    totalCount: 0,
    loadedCount: 0,
    init: function () {
        var mp3Support, oggSupport;
        var audio = document.createElement('audio');
        if (audio.canPalyType) {
            // TODO 检测声音
        }
    },

    loadImage: function (url) {
        this.totalCount++;
        this.loaded = false;
        $('#loadingscreen').show();
        //加载图片
        var img = new Image();
        img.src = url;
        img.onload = loader.itemLoaded;
        return img;
    },

    itemLoaded: function () {
        loader.loadedCount++;
        $('#loadingmessage').html('加载 : ' + loader.loadedCount + ' / ' + loader.totalCount);
        if(loader.loadedCount === loader.totalCount){
            loader = true;
            $('#loadingscreen').hide();
            if(loader.onload){
                loader.onload();
                loader.onload = undefined;
            }
        }
    }

};










