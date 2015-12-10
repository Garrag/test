/**
 * 粒子系统
 * @constructor
 */
function ParticleSystem() {
    // Private fields
    var that = this;
    var particles = new Array();//容器

    // Public fields
    this.gravity = new Vector2(0, 1500); //重力
    this.effectors = new Array(); //影响

    // Public methods

    this.emit = function(particle) { //发射粒子
        particles.push(particle);
    };
    /**
     * 运动模拟
     * @param dt  时间间隔
     */
    this.simulate = function(dt) {
        //aging(dt);  //计算小球的年龄和生命值
        applyGravity();  //加载重力
        applyEffectors(); //加载特效
        kinematics(dt); //使用重力和加速度
    };
    /**
     * 渲染
     * @param ctx
     */
    this.render = function(ctx) {
        for (var i in particles) {
            particles[i].render(ctx);
        }
    };
    // Private methods
    function aging(dt) {
        for (var i = 0; i < particles.length; ) {
            var p = particles[i];
            p.age += dt;
            if (p.age >= p.life)
                kill(i);
            else
                i++;
        }
    }
    function kill(index) {
        if (particles.length > 1)
            particles[index] = particles[particles.length - 1];//移动到最后一个
        particles.pop(); //剔除最后一个
    }
    function applyGravity() {
        for (var i in particles)
            particles[i].acceleration = that.gravity; //加上重力加速的
    }
    /**
     * 回调预先设置好的回调函数,把粒子传入回调方法
     */
    function applyEffectors() {
        for (var j in that.effectors) { //应用效果
            var apply = that.effectors[j].apply;
            for (var i in particles)
                apply(particles[i]);
        }
    }
    /**
     * 应用运动力学,根据时间计算位置和速度的变化
     * @param dt
     */
    function kinematics(dt) {
        for (var i in particles) {
            particles[i].kinematics(dt);
        }
    }
    /**
     * 获取粒子库
     */
    this.getParticles = function(){
        return particles;
    }

}
