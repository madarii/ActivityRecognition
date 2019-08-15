const express = require("express");
const fs = require("fs");
const socket = require("socket.io");
const app = express();

const server = app.listen(3030,()=>{
  console.log('listning on port 3030');
});

const io = socket(server);

app.use(express.static('public'));

io.on('connection',(socket)=>{
  console.log('client connected');

  socket.on('data',(data)=>{
    var instance = data.data;
    fs.writeFileSync(__dirname + '/data/rawdata.csv',instance);
    // console.log(data);
    // io.emit('data',data);
  })

  socket.on('disconnect',()=>{
    console.log('client disconnected')
    fs.truncate(__dirname + '/data/rawdata.csv',0,()=>{
      console.log('raw data file truncated');
    })
  });
});
