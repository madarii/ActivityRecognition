const express = require("express");
const fs = require("fs");
const socket = require("socket.io");
const {spawn} = require('child_process')
const app = express();

const server = app.listen(3030,()=>{
  console.log('listning on port 3030');
});

const io = socket(server);

app.use(express.static('public'));

//create folders and files
try{
  fs.mkdirSync(__dirname + '/python/data');
}
catch(e){}

fd = fs.openSync(__dirname + '/python/data/rawdata.csv','w');
fs.closeSync(fd);


function run_classifier(){
  proc = spawn('python',["-u",__dirname + '/python/activityRecognition.py']);

  proc.stderr.on('data',(data)=>{
    console.log(`error:${data}`);
  })

  proc.stdout.on('data',(data)=>{
    data = `${data}`
    io.emit('classification',data);
  })
}

io.on('connection',(socket)=>{
  console.log('client connected');

  socket.on('not sensing',()=>{
    console.log('sensing stopped');
    proc.kill('SIGINT');
    console.log('classifier stopped')
  })

  socket.on('sensing',()=>{
    console.log('sensing started')
     run_classifier();
  })

  socket.on('data',(data)=>{
    let instance = data.data;
    // fs.writeSync(fd,instance);
    fs.writeFileSync(__dirname + '/python/data/rawdata.csv',instance);
  })

  socket.on('disconnect',()=>{
    // fs.closeSync(fd);
    console.log('client disconnected')
    fs.truncate(__dirname + '/python/data/rawdata.csv',0,()=>{
      console.log('raw data file truncated');
    })
  });
});
