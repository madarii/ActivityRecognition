const socket = io.connect('http://' + location.hostname + ':3030');

socket.on('classification',(data)=>{
  document.getElementById('predictedLable').innerHTML = data;
});
