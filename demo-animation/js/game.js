/**
 * Created by admin on 2015/12/16.
 */
(function () {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        start_time = new Date().getTime(),
        elapsed = null,
        gravity = 900,
        fl = 250, //焦距
        vpX = canvas.width / 2, //视点
        vpY = canvas.height / 2,
        bounce = -0.6,
        floor = 100,
        ax = 0,
        ay = 0,
        az = 0,
        nFloor = new Floor(8, 8);
    nFloor.setVanishingPoint(vpX, vpY);

    var balls = [],
        ballNum = 30;
    for (var i = 0; i < ballNum; i++) {
        var ball = new Ball3d(5, Math.random() * 0xffffff);
        ball.ypos = -150;
        ball.vx = Math.random() * 1000 - 500;
        ball.vy = Math.random() * 1000 - 500;
        ball.vz = Math.random() * 1000 - 500;
        balls.push(ball);
    }

    window.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 38:        //up
                az = -100;
                nFloor.cZ += 10;
                break;
            case 40:        //down
                az = 100;
                break;
            case 37:        //left
                ax = 100;
                break;
            case 39:        //right
                ax = -100;
                break;
            case 32:        //space
                ay = 100;
                break;
        }
    }, false);

    window.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 38:        //up
            case 40:        //down
                az = 0;
                break;
            case 37:        //left
            case 39:        //right
                ax = 0;
                break;
            case 32:        //space
                ay = 0;
                break;
        }
    }, false);


    function drawBall(ball) {
        if (ball.visible) {
            ball.draw(context);
        }
    }

    //移动物体
    function move(ball) {
        if (elapsed) {
            ball.xpos += ball.vx * elapsed / 1000;
            ball.ypos += ball.vy * elapsed / 1000;
            ball.zpos += ball.vz * elapsed / 1000;
            ball.vy += gravity * elapsed / 1000;
            if (ball.ypos > floor) {
                ball.ypos = floor;
                ball.vy *= bounce;
            }
            //平面转3D
            if (ball.zpos > -fl) {
                var scale = fl / (fl + ball.zpos);
                ball.scaleX = ball.scaleY = scale;
                ball.x = vpX + ball.xpos * scale;
                ball.y = vpY + ball.ypos * scale;
                ball.visible = true;
            } else {
                ball.visible = false;
            }
        }
    }

    function getTimer() {
        return (new Date().getTime() - start_time); //milliseconds
    }

    var time = getTimer();
    (function drawFrame() {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        elapsed = getTimer() - time;
        nFloor.draw(context);
        balls.forEach(move);
        balls.forEach(drawBall);
        time = getTimer();
    })();

})();