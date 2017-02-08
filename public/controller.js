//ng-app
var app=angular.module('app',[]);
//controller
app.controller('ctr',function($scope){

	var socket=io();
    var user;

    $scope.second=true;

    $scope.setUsername=function(){
            socket.emit('setUsername',$scope.uname );
        };

     socket.on('userExists', function(data){
            $scope.result = data;
        });
        socket.on('userSet', function(data){
            user = data.username;
            $scope.first=true;
            $scope.second=false;
        });
});

