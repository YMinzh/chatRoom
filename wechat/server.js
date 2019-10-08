var http = require('http');
var ws = require('socket.io');
//创建监听端口
var server = http.createServer(function(req,res){
   res.end("i");
}).listen(3000);

var io = ws(server);
//存储用户名
var namearr={};
//监听端口消息
io.on("connection",function(socket){
    //接收用户名和socket id并存储
    socket.on("name",function(obj){
        namearr[obj.split('进')[0]]=socket.id;
        io.sockets.emit("text",obj);
        console.log(namearr);
    });
    //接受群聊消息并广播
    socket.on("measure",function(obj){
        io.sockets.emit("text",obj);   
    });
    //接受私聊消息并传给对应的人
    socket.on("prevate",function(obj){
        if(namearr[obj.to]==undefined){
            io.sockets.connected[namearr[obj.name]].emit("text","查无此人");
        }else{
            io.sockets.connected[namearr[obj.name]].emit("text",obj.name+":"+obj.msg);
            io.sockets.connected[namearr[obj.to]].emit("text",obj.name+":"+obj.msg);
        }
    });
    //断开链接
    socket.on("disconnect",function(){
        var theId;
        for(var i in namearr){
            if(namearr[i]==socket.id){
                theId = i;
            }
        }
        io.sockets.emit("text",theId+"退出聊天室");
        delete namearr[theId];
    });

});


