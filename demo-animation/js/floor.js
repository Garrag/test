/**
 * Created by admin on 2015/12/16.
 */

//地面
function Floor(w, h) {
    this.cX = 0;
    this.cY = 0;
    this.cZ = 0;
    this.w = w || 0;
    this.h = h || 0;
    this.bricks = [];
    for (var i = 0; i < w; i++) {
        for (var j = 0; j < h; j++) {
            var brick = new Brick(i, j);
            this.bricks.push(brick);
        }
    }
}

Floor.prototype.setVanishingPoint = function (vpX, vpY) {
    this.bricks.forEach(function (bricks) {
        bricks.setVanishingPoint(vpX, vpY);
    });
};

Floor.prototype.setCenter = function (cX, cY, cZ) {
    this.cX = cX;
    this.cY = cY;
    this.cZ = cZ;
};

Floor.prototype.draw = function (context) {
    this.bricks.forEach(function (brick) {
        brick.draw(context);
    });
};
