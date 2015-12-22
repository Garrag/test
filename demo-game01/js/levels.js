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
            html += '<input type="button" value="' + (i + 1) + '" >';
        }
        $('#levelselectscreen').html(html);
        $('#levelselectscreen input').click(function () {
            levels.load(this.value - 1);
            $('#levelselectscreen').hide();
        });
    },

    load: function (number) {
        console.log(number);
    }
};