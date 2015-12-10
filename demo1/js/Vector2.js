/**
 * Created by admin on 2015/10/14.
 */

//定义一个矢量对象
Vector2 = function (x, y) {
    this.x = x;
    this.y = y;
};

Vector2.prototype = {
    copy: function () {
        return new Vector2(this.x, this.y);
    },
    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    sqrLength: function () {
        return this.x * this.x + this.y * this.y;
    },
    normalize: function () {
        var inv = 1 / this.length();
        return new Vector2(this.x * inv, this.y * inv);
    },
    negate: function () {
        return new Vector2(-this.x, -this.y);
    },
    /**
     * 根据传的矢量值,对矢量进行相加
     * @param v
     * @returns {Vector2}
     */
    add: function (v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    },
    subtract: function (v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    },
    /**
     * 乘以对应系数
     * @param f 系数
     * @returns {Vector2}
     */
    multiply: function (f) {
        return new Vector2(this.x * f, this.y * f);
    },
    /**
     * 除以对应系数
     * @param f
     * @returns {Vector2}
     */
    divide: function (f) {
        var invf = 1 / f;
        return new Vector2(this.x * invf, this.y * invf);
    },
    dot: function (v) {
        return this.x * v.x + this.y * v.y;
    }
};

Vector2.zero = new Vector2(0, 0);