/**
 * Created by admin on 2015/10/15.
 */
var utils = {
    initTextPoints: function (str, n) {
        var cs = document.createElement('canvas');
        cs.width = 300;
        cs.height = 300;
        var ctx = cs.getContext("2d");
        ctx.font = 'bold 15px serif'; //Verdana
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.fillText(str, 0, 0);
        //获取文本宽度
        //var w = ctx.measureText(str).width;
        //var offsetX = (cs.width - w * n) >> 1; //初始化位置
        //var offsetY = (cs.height - 28 * n) >> 1; //初始化位置
        var textPoints = [];
        var imgData = ctx.getImageData(0, 0, cs.width, cs.height).data;

        //解析图片数据
        for (var i = 0, wl = cs.width * 4; i < imgData.length; i += 4) {
            if (imgData[i + 3] > 100) { //透明度大于100则记录位置
                x = (i % wl) / 4;
                y = parseInt(i / wl);
                textPoints.push([x*n , y*n]);
            }
        }
        //for(var k in textPoints){
        //    console.log(textPoints[k]);
        //}
        return textPoints;
    }
};