var canvas, ctx, isContinue, timeoutID;
var app_width = window.innerWidth -5;
var app_height = window.innerHeight-5;

function start(canvasName, func) {
    if (timeoutID)
        stop();
    canvas = document.getElementById(canvasName);

    canvas.width = app_width;
    canvas.height = app_height;

    ctx = canvas.getContext("2d");
    isContinue = true;
    var loop = function() {
        func();
        if (isContinue)
            timeoutID = setTimeout(loop, 100/6); //80FPS
    };
    loop();
}

function stop() {
    clearTimeout(timeoutID);
    isContinue = false;
}

function clearCanvas() {
    if (ctx != null)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
}
