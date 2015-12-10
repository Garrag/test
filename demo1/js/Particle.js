/**
 * Created by admin on 2015/10/14.
 */
/**
 * ����ϵͳ������ʸ����϶��ɵ�
 * @param position λ��
 * @param velocity �ٶ�
 * @param life  ����
 * @param color ��ɫ
 * @param size ��С
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
     * ��Ⱦ
     * @param ctx
     */
    this.render = function(ctx) {
        //var alpha = 1 - p.age / p.life;
        //��������ֵ������С���͸����
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
     * �仯λ��
     */
    this.kinematics = function(dt){
        this.position = this.position.add(this.velocity.multiply(dt));//λ�ñ仯(�����ٶ�������)
        this.velocity = this.velocity.add(this.acceleration.multiply(dt)); //�ٶȱ仯
    };

    this.moveTo = function(){

    }

};