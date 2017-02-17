var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);

app.use(express.static(__dirname+"/public"));

app.get('/',function(req,res){
  res.sendfile('index.html');
});

users=[];
msgs=[];
io.on('connection',function(socket){
   console.log("A user just arrived");
   socket.on('setUsername2',function(data){
   	   if(users.indexOf(data)<0){

   	   	 users.push(data);
   	   	 socket.emit('userSet',{username:data});
   	   }
   	   else{
   	   	 socket.emit('userExists',data+'is already taken');
   	   	 
   	   }
  })
    socket.on('msg', function(data){
      // io.sockets.emit('newmsg', data);
       msgs.push(data.user+':'+data.message);
        io.sockets.emit('newmsg', msgs);
  })
});

http.listen(8081,function(){
    console.log('Port 8081');
});