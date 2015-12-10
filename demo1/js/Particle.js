/**
 * Created by admin on 2015/10/14.
 */
/**
 * 粒子系统由两个矢量组合而成的
 * @param position 位置
 * @param velocity 速度
 * @param life  生命
 * @param color 颜色
 * @param size 大小
 * @constructor
 */
Particle = function(id, position, velocity, life, color, size) {
    this.id = id;
    this.position = position;
    this.velocity = velocity;
    this.acceleration = Vector2.zero;
    this.age = 0;
    this.life = life;
    this.color = color;
    this.size = size;

    /**
     * 渲染
     * @param ctx
     */
    this.render = function(ctx) {
        //var alpha = 1 - p.age / p.life;
        //根据生命值来调节小球的透明度
        ctx.fillStyle = "rgba("
            + Math.floor(this.color.r * 255) + ","
            + Math.floor(this.color.g * 255) + ","
            + Math.floor(this.color.b * 255) + ","
            + 255 + ")"; //alpha.toFixed(2)
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.size, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    };
    /**
     * 变化位置
     */
    this.kinematics = function(dt){
        this.position = this.position.add(this.velocity.multiply(dt));//位置变化(根据速度来决定)
        this.velocity = this.velocity.add(this.acceleration.multiply(dt)); //速度变化
    };

    this.moveTo = function(){

    }

};