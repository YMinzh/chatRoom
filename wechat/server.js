var http = require('http');
var ws = require('socket.io');

var server = http.createServer(function(req,res){
   res.end("i");
	

}).listen(3000);

var io = ws(server);
var namearr={};

io.on("connection",function(socket){
    socket.on("name",function(obj){
        namearr[obj.split('进')[0]]=socket.id;
        io.sockets.emit("text",obj);
        console.log(namearr);
    });
    socket.on("measure",function(obj){

        io.sockets.emit("text",obj);
    
    });
    socket.on("prevate",function(obj){
        if(namearr[obj.to]==undefined){
            io.sockets.connected[namearr[obj.name]].emit("text","查无此人");
        }else{
            io.sockets.connected[namearr[obj.name]].emit("text",obj.name+":"+obj.msg);
            io.sockets.connected[namearr[obj.to]].emit("text",obj.name+":"+obj.msg);
        }
    });
});

/*
var ws = require('socket.io');

var io = ws(3000);  
io.on('connection',function (socket){
    console.log("一个连接");
    socket.on("message",function(obj){
    	console.log(obj);
    });
});

*/
