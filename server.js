var express=require('express');
var app=express();
var http=require('http').Server(app);
var io=require('socket.io')(http);
var mongojs=require('mongojs');
var db=mongojs('chatapp',['chatapp']);
var bodyParser=require('body-parser');

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendfile('index.html');
});

users=[];
msgs=[];
io.on('connection',function(socket){

   
   socket.on('setUsername2',function(data){
      var isSet=0;
      var cursor=db.chatapp.find(function(err,docs){
           
           docs.forEach(myfunction);

           function myfunction(item){
                    if(data==item.uname){
                    	 isSet=1;
                    }
           }
           if(isSet==0){
           	 socket.emit('userSet',{username:data});
           }
           else{
           	   socket.emit('userExists',data+'is already taken');
           }
           
      })

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