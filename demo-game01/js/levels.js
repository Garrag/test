/**
 * Created by admin on 2015/12/21.
 */
/**
 * 关卡数据,已经控制
 * @type {{data: *[], init: Function, load: Function}}
 */
var levels = {
    data: [
        {//第一关
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        },
        {//第二关
            foreground: 'desert-foreground',
            background: 'clouds-background',
            entities: []
        }
    ],
    init: function () {
        var html = "";
        for (var i = 0; i < levels.data.length; i++) {
            //var level = levels.data[i];
            html += '<input type="button" value="' + (i + 1) + '">';
        }
        $('#levelselectscreen').html(html);
        $('#levelselectscreen input').click(function () {
            levels.load(this.value - 1);
            $('#levelselectscreen').hide();
        });
    },
    /**
     * 加载数据,更具选着的关卡
     * @param number
     */
    load: function (number) {
        game.currentLevel = {number: number, hero: []};
        game.score = 0;
        $('#score').html('Score : ' + game.score);//显示得分
        var level = levels.data[number]; //拿出游戏数据

        game.currentLevel.backgroundImage = loader.loadImage('images/backgrounds/' + level.background + '.png');
        game.currentLevel.foregroundImage = loader.loadImage('images/backgrounds/' + level.foreground + '.png');
        game.slingshotImage = loader.loadImage('images/slingshot.png');
        game.slingshotFrontImage = loader.loadImage('images/slingshot-front.png');

        if(loader.loaded){
            game.start();
        }else {
            loader.onload = game.start;
        }

    }

};