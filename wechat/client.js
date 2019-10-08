var readline = require('readline');

//建立socket链接
var socket = require('socket.io-client')('http://localhost:3000');
var name;
var count = 0;
var rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
});
console.log("请输入用户名");
//键盘录入
//首次录入为用户名,后面为消息
rl.on('line',function(answer){
    if(count==0){
        name = answer;
        socket.emit("name",name+"进入房间");
        count++;
    }else{
        var reg = /^@/;
        if(reg.test(answer)){
            var msgarr=answer.split(' ');
            var to = msgarr[0].substring(1);
            var msg='';
            for(var i = 1;i<msgarr.length;i++){
                msg += msgarr[i];
                if(i<msgarr.length-1){
                    msg += ' ';
                }
            }
            var arr={name,to,msg}
            socket.emit("prevate",arr);

        }else{
            socket.emit("measure",name+":"+answer);

        }




    }
});
//监听服务器广播的消息
socket.on("text",function(obj){
    if(count==0){

    }else{
        console.log(obj);
    }
});

    
    

 


