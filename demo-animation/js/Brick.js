/**
 * Created by admin on 2015/12/16.
 */
//砖块
function Brick(i, j, color) {
    this.width = 100;
    this.height = 100;
    this.points = [];
    this.points[0] = new Point3d(this.width * i, -this.height * (j + 1), 100);
    this.points[1] = new Point3d(this.width * (i + 1), -this.height * (j + 1), 100);
    this.points[2] = new Point3d(this.width * (i + 1), -this.height * j, 100);
    this.points[3] = new Point3d(this.width * i, -this.height * j, 100);
    this.color = (color === undefined) ? "#ff0000" : utils.parseColor(color);
    this.lineWidth = 2;
    this.alpha = 0.5;
}

Brick.prototype.setVanishingPoint = function (vpX, vpY) {
    this.points.forEach(function (point) {
        point.setVanishingPoint(vpX, vpY);
        point.rotateX(-Math.PI / 2);
    });
};

Brick.prototype.setCenter = function (cX, cY, cZ) {
    this.points.forEach(function (point) {
        point.setCenter(cX, cY, cZ);
    });
};

Brick.prototype.draw = function (context) {
    context.save();
    //把4点连接起来
    context.lineWidth = this.lineWidth;
    context.fillStyle = context.strokeStyle = utils.colorToRGB(this.color, this.alpha);
    context.beginPath();
    context.moveTo(this.points[0].getScreenX(), this.points[0].getScreenY());
    context.lineTo(this.points[1].getScreenX(), this.points[1].getScreenY());
    context.lineTo(this.points[2].getScreenX(), this.points[2].getScreenY());
    context.lineTo(this.points[3].getScreenX(), this.points[3].getScreenY());
    context.closePath();
    context.fill();
    if (this.lineWidth > 0) {
        context.stroke();
    }
    context.restore();
};