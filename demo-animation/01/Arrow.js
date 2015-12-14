/**
 * Created by admin on 2015/12/12.
 */
function Arrow(){ //定义一个箭头
    this.x = 0;
    this.y = 0;
    this.color = '#ffff00';
    this.rotation = 0;
}

//渲染
Arrow.prototype.draw = function(context){
    context.save();
    context.translate(this.x, this.y); //把坐标原点移动到 箭头想要出现的位置
    context.rotate(this.rotation); //设置箭头角度
    context.lineWidth = 2; //设置箭头的 线条粗细
    context.fillStyle = this.color; //填充颜色
    context.beginPath();
    context.moveTo(-50, -25);
    context.lineTo(0, -25);
    context.lineTo(0, -50);
    context.lineTo(50, 0);
    context.lineTo(0, 50);
    context.lineTo(0, 25);
    context.lineTo(-50, 25);
    context.lineTo(-50, -25);
    context.closePath();
    context.fill();
    context.stroke();
    context.restore();
}