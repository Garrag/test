/**
 * Created by admin on 2015/10/26.
 */
var starX = new Array();
var starY = new Array();
var starR = new Array();
var starSpeed = new Array();
var starDirX = new Array();
var starDirY = new Array();
var starDisplay = new Array();
var starCount = 500;
var canvasWidth = 1900;
var canvasHeight = 950;
var refreshRate = 50;
var zoomMode = false;
var scopeMode = false;
var binoxR = 200;
var binoxCenterX = canvasWidth / 2;
var binoxCenterY = canvasHeight / 2;
var zoomLevel = 2.0;
var binoxDeviation = canvasWidth / 6;
var scopeDeviation = 0;
var transitionIntervalId;
var binoxScopeTransitionTime = 10;
var binoxCenterXDeviation = binoxDeviation;
var binoxX1 = binoxCenterX - binoxCenterXDeviation;
var binoxY1 = binoxCenterY;
var binoxX2 = binoxCenterX + binoxCenterXDeviation;
var binoxY2 = binoxCenterY;
var zoomCenterX = canvasWidth / 2;
var zoomCenterY = canvasHeight / 2;
var zoomFactor = 1;
var shotRadius = 10;
var boomSeconds = 4;
var lastShotX, lastShotY;
var newShot = false;
function mouseClicked() {
    if (scopeMode) {
        // JUGAD TO COUNTER ZOOM
        lastShotX = zoomCenterX + (binoxCenterX - zoomCenterX) / zoomLevel;
        lastShotY = zoomCenterY + (binoxCenterY - zoomCenterY) / zoomLevel;
        newShot = true;
        for (j = 0; j < starCount; j++) {
            if (Math.abs(starX[j] - lastShotX) <= shotRadius &&
                Math.abs(starY[j] - lastShotY) <= shotRadius) {
                starDisplay[j]--;
            }
        }
    }
}
function mouseMoved(evt) {
    binoxCenterX = evt.offsetX;
    binoxCenterY = evt.offsetY;
    if (zoomMode) {
        setBinoxCoordinates();
    }
}
function binoxToScope() {
    if (binoxCenterXDeviation <= scopeDeviation) {
        binoxCenterXDeviation = scopeDeviation;
        clearInterval(transitionIntervalId);
    }
    else {
        binoxCenterXDeviation -=
            (binoxDeviation - scopeDeviation) / binoxScopeTransitionTime;
    }
    setBinoxCoordinates();
}
function scopeToBinox() {
    if (binoxCenterXDeviation >= binoxDeviation) {
        binoxCenterXDeviation = binoxDeviation;
        clearInterval(transitionIntervalId);
    }
    else {
        binoxCenterXDeviation +=
            (binoxDeviation - scopeDeviation) / binoxScopeTransitionTime;
    }
    setBinoxCoordinates();
}
function keyPressed(evt) {
    var key = (evt) ? evt.which : event.keyCode;
    if (String.fromCharCode(key) == ' ') {
        if (!zoomMode) {
            zoomCenterX = binoxCenterX;
            zoomCenterY = binoxCenterY;
        }
        if (scopeMode) {
            zoomMode = true;
            clearInterval(transitionIntervalId);
            transitionIntervalId =
                setInterval(scopeToBinox, binoxScopeTransitionTime);
        }
        else {
            zoomMode = !zoomMode;
            binoxCenterXDeviation = binoxDeviation;
        }
        scopeMode = false;
        setBinoxCoordinates();
    }
    else if (String.fromCharCode(key) == 's' || String.fromCharCode(key) == 'S') {
        scopeMode = !scopeMode;
        if (zoomMode && scopeMode) {
            clearInterval(transitionIntervalId);
            transitionIntervalId =
                setInterval(binoxToScope, binoxScopeTransitionTime);
        }
        else {
            binoxCenterXDeviation = scopeDeviation;
        }
        if (!zoomMode && scopeMode) {
            zoomCenterX = binoxCenterX;
            zoomCenterY = binoxCenterY;
        }
        zoomMode = scopeMode;
        setBinoxCoordinates();
    }
}
function setBinoxCoordinates() {
    binoxX1 = binoxCenterX - binoxCenterXDeviation;
    binoxY1 = binoxCenterY;
    binoxX2 = binoxCenterX + binoxCenterXDeviation;
    binoxY2 = binoxCenterY;
}
function moveStar() {
    for (j = 0; j < starCount; j++) {
        starX[j] += starDirX[j] * starSpeed[j];
        starY[j] += starDirY[j] * starSpeed[j];
        if (starX[j] < 0)
            starX[j] += canvasWidth;
        else if (starX[j] > canvasWidth)
            starX[j] -= canvasWidth;
        if (starY[j] < 0)
            starY[j] += canvasHeight;
        else if (starY[j] > canvasHeight)
            starY[j] -= canvasHeight;
    }
    draw();
}
function genStar() {
    for (j = 0; j < starCount; j++) {
        starX[j] = canvasWidth - Math.floor(Math.random() * canvasWidth);
        starY[j] = canvasHeight - Math.floor(Math.random() * canvasHeight);
        starR[j] = Math.floor(Math.random() * 4) + 3; // 3 to 6
        if (starR[j] == 6)
            starR[j] += Math.floor(Math.random() * 2); // split speed 6 into 2
        // halves, 6 & 7
        starSpeed[j] = Math.floor(Math.random() * 5) + 1; // 1 to 10
        starDirX[j] = Math.floor(Math.random() * 2.9999) - 1; // -1 to 1
        starDirY[j] = Math.floor(Math.random() * 2.99999) - 1; // -1 to 1
        starDisplay[j] = boomSeconds;
    }
    setInterval(moveStar, refreshRate);
    document.getElementById('canvas').addEventListener('mousemove', mouseMoved,
        false);
    document.getElementById('canvas').addEventListener('click', mouseClicked,
        false);
}
function draw() {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.save();
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    if (zoomMode) {
        // START DRAW BINOX
        ctx.fillStyle = '#274b5c';
        ctx.strokeStyle = '#FFFFFF';
        // quadratic curves
        ctx.beginPath();
        ctx.moveTo(binoxCenterX - 40, binoxCenterY - binoxR - 20 - 10);
        ctx.quadraticCurveTo(binoxCenterX - 60, binoxCenterY - 170, binoxX1 + 200,
            binoxY1 - binoxR - 35 + 65);
        ctx.lineTo(binoxX1 + 233, binoxY1 - 135);
        ctx.quadraticCurveTo(binoxCenterX - 75, binoxCenterY - 175,
            binoxCenterX - 25, binoxCenterY - binoxR - 20 + 45);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(binoxCenterX + 40, binoxCenterY - binoxR - 20 - 10);
        ctx.quadraticCurveTo(binoxCenterX + 60, binoxCenterY - 170, binoxX2 - 200,
            binoxY2 - binoxR - 35 + 65);
        ctx.lineTo(binoxX2 - 233, binoxY2 - 135);
        ctx.quadraticCurveTo(binoxCenterX + 75, binoxCenterY - 175,
            binoxCenterX + 25, binoxCenterY - binoxR - 20 + 45);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        // beizer curves
        ctx.beginPath();
        ctx.moveTo(binoxX1 + 115, binoxY1 - binoxR - 35 + 30);
        ctx.bezierCurveTo(binoxX1 + 266, binoxY1 - 200, binoxX1 + 366,
            binoxY1 + 100, binoxX1 + 194, binoxY1 + binoxR + 35 - 100);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(binoxX2 - 115, binoxY2 - binoxR - 35 + 30);
        ctx.bezierCurveTo(binoxX2 - 266, binoxY2 - 200, binoxX2 - 366,
            binoxY2 + 100, binoxX2 - 194, binoxY2 + binoxR + 35 - 100);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        // circles
        ctx.beginPath();
        ctx.arc(binoxX1, binoxY1, binoxR + 35, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxX2, binoxY2, binoxR + 35, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxCenterX, binoxCenterY - binoxR - 20, 50, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        // strokes
        ctx.beginPath();
        ctx.arc(binoxX1, binoxY1, binoxR, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxX2, binoxY2, binoxR, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxX1, binoxY1, binoxR + 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxX2, binoxY2, binoxR + 10, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxCenterX, binoxCenterY - binoxR - 20, 40, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(binoxCenterX, binoxCenterY - binoxR - 20, 30, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.stroke();
        // END DRAW BINOX
        // Create a circular clipping path
        ctx.beginPath();
        ctx.arc(binoxX1, binoxY1, binoxR, 0, Math.PI * 2, true);
        ctx.arc(binoxX2, binoxY2, binoxR, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
    }
    // draw background
    var lingrad =
        ctx.createLinearGradient(canvasWidth / 2, canvasHeight / 2 - binoxR,
            canvasWidth / 2, canvasHeight / 2 + binoxR);
    lingrad.addColorStop(0, '#232256');
    lingrad.addColorStop(1, '#8399d4');
    ctx.fillStyle = lingrad;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    if (zoomMode) {
        // ZOOM WHOLE SKY (Looks Better)
        ctx.translate(zoomCenterX, zoomCenterY);
        ctx.scale(zoomLevel, zoomLevel);
        ctx.translate(-zoomCenterX, -zoomCenterY);
        // JUST ZOOM STARS
        // zoomFactor=zoomLevel;
    }
    else {
        zoomFactor = 1;
    }
    // draw stars
    for (j = 1; j < starCount; j++) {
        if (starDisplay[j] < 0) {
            continue;
        }
        if (starDisplay[j] == 0) {
            newShot = false;
            starDisplay[j]--;
            continue;
        }
        else if (starDisplay[j] < boomSeconds) {
            // draw boom
            if (newShot) {
                ctx.save();
                var grd =
                    ctx.createRadialGradient(lastShotX, lastShotY, 0, lastShotX,
                        lastShotY, shotRadius);
                grd.addColorStop(0.2, 'yellow');
                grd.addColorStop(0.45, 'orange');
                grd.addColorStop(0.86, 'red');
                ctx.fillStyle = grd;
                ctx.strokeStyle = '#f51dee';
                ctx.beginPath();
                ctx.arc(lastShotX, lastShotY, shotRadius, 0, Math.PI * 2, true);
                ctx.closePath();
                // ctx.stroke();
                ctx.fill();
                ctx.restore();
            }
            ctx.save();
            ctx.fillStyle = 'red';
            // draw circular dying star
            /*
             * ctx.beginPath();
             * ctx.arc(starX[j],starY[j],starDisplay[j],0,Math.PI*2,true);
             * ctx.closePath(); ctx.fill();
             */
            // draw star shaped dying star
            ctx.translate(starX[j], starY[j]);
            drawStar(ctx, (starR[j] - boomSeconds + starDisplay[j]) * zoomFactor);
            ctx.restore();
            starDisplay[j]--;
        }
        else {
            // draw trail for star radius = 7
            if (starR[j] == 7) {
                ctx.save();
                ctx.globalAlpha = 0.25;
                ctx.fillStyle = '#c7c7c7';
                ctx.translate(starX[j] - starDirX[j] * 5, starY[j] - starDirY[j] * 5);
                drawStar(ctx, starR[j] * zoomFactor);
                ctx.restore();
                ctx.save();
                ctx.globalAlpha = 0.65;
                ctx.fillStyle = '#c7c7c7';
                ctx.translate(starX[j] - starDirX[j] * 2, starY[j] - starDirY[j] * 2);
                drawStar(ctx, starR[j] * zoomFactor);
                ctx.restore();
            }
            ctx.save();
            ctx.fillStyle = '#fff';
            ctx.translate(starX[j], starY[j]);
            drawStar(ctx, starR[j] * zoomFactor);
            ctx.restore();
        }
    }
    if (scopeMode && binoxCenterXDeviation == scopeDeviation) {
        // Draw Crosshairs
        ctx.save();
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.3;
        ctx.beginPath();
        // JUGAD TO COUNTER ZOOM
        var tempZoomCenterX =
            zoomCenterX + (binoxCenterX - zoomCenterX) / zoomLevel;
        var tempZoomCenterY =
            zoomCenterY + (binoxCenterY - zoomCenterY) / zoomLevel;
        ctx.moveTo(tempZoomCenterX - binoxR / zoomLevel, tempZoomCenterY);
        ctx.lineTo(tempZoomCenterX + binoxR / zoomLevel, tempZoomCenterY);
        ctx.closePath();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(tempZoomCenterX, tempZoomCenterY - binoxR / zoomLevel);
        ctx.lineTo(tempZoomCenterX, tempZoomCenterY + binoxR / zoomLevel);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
    ctx.restore();
}
function drawStar(ctx, r) {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(r, 0);
    for (var i = 0; i < 9; i++) {
        ctx.rotate(Math.PI / 5);
        if (i % 2 == 0) {
            ctx.lineTo((r / 0.525731) * 0.200811, 0);
        }
        else {
            ctx.lineTo(r, 0);
        }
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}