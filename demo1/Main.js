/**
 * Created by admin on 2015/10/14.
 */
var ps = new ParticleSystem();
var dt = 0.04; //时间间隔
ps.gravity = Vector2.zero; //重力为0
/**
 * 加载边界
 */
function initMap(){
    //设置边界
    var padding = 0;
    ps.effectors.push(new ChamberBox(padding, padding, app_width-padding, app_height-padding)); // 最重要是多了这语句
}
/**
 * 初始化粒子
 */
function initParticle(){
    for(var i=1; i<500; i++){
        var color = sampleColor(Color.red, Color.yellow);
        //ps.emit(new Particle(i, new Vector2(range(5, app_width-5),range(5, app_height-5)), new Vector2(0,0) , 3600, color, 9));
        ps.emit(new Particle(i, new Vector2(10,10), new Vector2(0,0) , 3600, color, 7));
    }
}
function range(a, b) {
    return Math.floor(Math.random()*(b-a) + a);
}

/**
 * 随机获取颜色
 * @param color1
 * @param color2
 * @returns {*|Vector2}
 */
function sampleColor(color1, color2) {
    var t = Math.random();
    return color1.multiply(t).add(color2.multiply(1 - t));
}
/**
 * 排列粒子根据文字
 */
function arrange(str, size){
    var arr = utils.initTextPoints(str, size);
    var pars = ps.getParticles();
    for(var k in arr){
        pars[k].position = new Vector2(arr[k][0], arr[k][1]).add(new Vector2(100,200));
    }
}
/**
 * 每一帧的动作
 */
function step(){
    ps.simulate(dt); //模拟运动学
    ctx.fillStyle="rgba(0, 0, 0, 1)"; //清空上一帧
    ctx.fillRect(0,0,canvas.width,canvas.height);
    //clearCanvas();
    ps.render(ctx);
}

window.onload = function(){
    initParticle();
    initMap();
    start("kinematicsCancas", step);

    //移动粒子
    setTimeout(function(){
        arrange("科技之美", 15);
    }, 1000);
    ////加上重力
    //setTimeout(function(){
    //    ps.gravity = new Vector2(0, 5000);
    //}, 3000);

    //setTimeout(function(){
    //    stop();
    //}, 5000);

};