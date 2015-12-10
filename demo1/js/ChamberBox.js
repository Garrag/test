/* 
* @requires Vector2, Particle
*/
function ChamberBox(x1, y1, x2, y2) {//TODO ���Ż�
    this.apply = function(particle) {
        if (particle.position.x - particle.size < x1){
            particle.velocity.x = -particle.velocity.x;//�ı��ٶȷ���
            particle.velocity = particle.velocity.multiply(0.6 + Math.random()*0.1);//��ײ����
            particle.position.x = x1 + particle.size;
        }

        if(particle.position.x + particle.size > x2){
            particle.velocity.x = -particle.velocity.x;//�ı��ٶȷ���
            particle.velocity = particle.velocity.multiply(0.6 + Math.random()*0.1);//��ײ����
            particle.position.x = x2 - particle.size;
        }

        if (particle.position.y - particle.size < y1){
            particle.velocity.y = -particle.velocity.y;//�ı��ٶȷ���
            particle.velocity = particle.velocity.multiply(0.5+ Math.random()*0.1);//��ײ����
            particle.position.y = y1 + particle.size;
        }

        if(particle.position.y + particle.size > y2){
            particle.velocity.y = -particle.velocity.y;//�ı��ٶȷ���
            particle.velocity = particle.velocity.multiply(0.5+ Math.random()*0.1);//��ײ����
            particle.position.y = y2 - particle.size;
        }

    };
}
