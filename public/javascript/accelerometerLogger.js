const socket = io.connect('http://' + location.hostname + ':3030');

let data = {};
let start = false;
let count = 0;
let instance = "";
const WINDOW_SIZE = 50
let firstRun = true;

function handleAccelerationEvent(event){
  data.x = event.accelerationIncludingGravity.x.toFixed(3);
  data.y = event.accelerationIncludingGravity.y.toFixed(3);
  data.z = event.accelerationIncludingGravity.z.toFixed(3);
}

function init(){
  if(window.DeviceMotionEvent){
    window.addEventListener('devicemotion',handleAccelerationEvent);
  }
  else {
    alert("device not supported");
  }
}

// Maintaining frequency rate of 50hz as our feature window is of size 50 samples
// per second
function startInterval(){
  setInterval(()=>{
    if(start){
      instance += Date.now() + "," + data.x + "," + data.y + "," + data.z + "\n";
      count = count + 1;
      if(count == WINDOW_SIZE){
        socket.emit('data', {data : instance});
        instance = "";
        count = 0;
      }
    }
  },1000/50);
}

function startSensing(){
  start = true;
  init();
  if(firstRun){
    startInterval();
    firstRun = false;
  }
}

function stopSensing(){
  start = false;
  count = 0;
  window.removeEventListener('devicemotion', handleAccelerationEvent);
}