/**
 * ����ϵͳ
 * @constructor
 */
function ParticleSystem() {
    // Private fields
    var that = this;
    var particles = new Array();//����

    // Public fields
    this.gravity = new Vector2(0, 1500); //����
    this.effectors = new Array(); //Ӱ��

    // Public methods

    this.emit = function(particle) { //��������
        particles.push(particle);
    };
    /**
     * �˶�ģ��
     * @param dt  ʱ����
     */
    this.simulate = function(dt) {
        //aging(dt);  //����С������������ֵ
        applyGravity();  //��������
        applyEffectors(); //������Ч
        kinematics(dt); //ʹ�������ͼ��ٶ�
    };
    /**
     * ��Ⱦ
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
            particles[index] = particles[particles.length - 1];//�ƶ������һ��
        particles.pop(); //�޳����һ��
    }
    function applyGravity() {
        for (var i in particles)
            particles[i].acceleration = that.gravity; //�����������ٵ�
    }
    /**
     * �ص�Ԥ�����úõĻص�����,�����Ӵ���ص�����
     */
    function applyEffectors() {
        for (var j in that.effectors) { //Ӧ��Ч��
            var apply = that.effectors[j].apply;
            for (var i in particles)
                apply(particles[i]);
        }
    }
    /**
     * Ӧ���˶���ѧ,����ʱ�����λ�ú��ٶȵı仯
     * @param dt
     */
    function kinematics(dt) {
        for (var i in particles) {
            particles[i].kinematics(dt);
        }
    }
    /**
     * ��ȡ���ӿ�
     */
    this.getParticles = function(){
        return particles;
    }

}
