//ng-app
var app=angular.module('app',[]);
//controller
app.controller('ctr',function($scope){

	var socket=io();
    var user;

    $scope.second=true;

    $scope.setUsername=function(){

            socket.emit('setUsername2',$scope.uname);
        };

     socket.on('userExists', function(data){
            $scope.result=data;
        });
     socket.on('userSet', function(data){    
            $scope.first=true;
            $scope.second=false;
        });
     $scope.send=function(){
            if($scope.message!=''){
                socket.emit('msg', {message: $scope.message, user: user});
            }
        }
         $scope.master='';
     socket.on('newmsg',function(data){
             $scope.master+=data.message;
     });

});

