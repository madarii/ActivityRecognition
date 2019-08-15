const express = require("express");
const fs = require("fs");
const socket = require("socket.io");
const app = express();

const server = app.listen(3030,()=>{
  console.log('listning on port 3030');
});

const io = socket(server);

app.use(express.static('public'));

fs.watch(__dirname + '/python/data/classification.txt',(eventName,fileName)=>{
  fs.readFile(__dirname + '/python/data/classification.txt','utf-8',(err,data)=>{
    if(err) return console.log('cannot read classification file',err);
    io.emit('classification', data);
  });
});

io.on('connection',(socket)=>{
  console.log('client connected');

  socket.on('data',(data)=>{
    var instance = data.data;
    fs.writeFileSync(__dirname + '/python/data/rawdata.csv',instance);
  })

  socket.on('disconnect',()=>{
    console.log('client disconnected')
    fs.truncate(__dirname + '/python/data/rawdata.csv',0,()=>{
      console.log('raw data file truncated');
    })
  });
});
