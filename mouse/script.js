var orientation = 0;

function init() {
  document.getElementById("platform").innerHTML = navigator.platform;
//  document.getElementById("userAgent").innerHTML = "userAgent:" + navigator.userAgent;
  document.getElementById("screen_size").innerHTML = innerWidth + ", " + innerHeight;
  document.addEventListener("mousedown", mouseHandler, false);
  document.addEventListener("mouseup", mouseHandler, false);
  document.addEventListener("mousemove", mouseHandler, false);
  window.addEventListener("orientationchange", orientationHandler, false);
  var canvas = document.getElementById('tutorial');
  canvas.width = innerWidth;
  canvas.height = innerHeight-40;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,innerWidth,innerHeight-40);
  }
}

function orientationHandler(event) {
  document.getElementById("platform").innerHTML = navigator.platform;
//  document.getElementById("userAgent").innerHTML = "userAgent:" + navigator.userAgent;
  orientation = window.orientation;
  if (orientation == 90 || orientation == -90) {
    var t = innerWidth;
    innerWidth = innerHeight; innerHeight = t;
  }
  document.getElementById("screen_size").innerHTML = innerWidth + ", " + innerHeight;
  var canvas = document.getElementById('tutorial');
  canvas.width = innerWidth;
  canvas.height = innerHeight-40;
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,innerWidth,innerHeight-40);
  }
}

function mouseHandler(event) {
  document.getElementById("mouse_x").innerHTML = event.pageX.toFixed(1);
  document.getElementById("mouse_y").innerHTML = event.pageY.toFixed(1);
  var canvas = document.getElementById('tutorial');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0,0,innerWidth,innerHeight-40);
    ctx.beginPath();
    ctx.arc(event.pageX, event.pageY-80, 50, 0, 2*Math.PI, true);
    ctx.stroke();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
    ctx.font = "40px Times New Roman";
    ctx.fillStyle = "Red";
    ctx.fillText("M", event.pageX-20, event.pageY-65);
  }
  event.preventDefault();
}
