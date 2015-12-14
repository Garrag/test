/**
 * Created by admin on 2015/12/11.
 */
var net = require('net');

var count = 0;
var server = net.createServer(function(conn){
    console.log('\033[90m   创建一个连接! \033[39m');

    conn.write(
        " \n Welcome to this chat, \n " +
        count + " other people are connected at this time"
    );
    count++;

    conn.on('data', function(data){

    });

    //监听用户关闭客户端
    conn.on('close', function(){
        count--;
        console.log("有人退出了");
    });

});

server.listen(3000, function(){
    console.log('\033[90m   开始监听3000端口 \033[39m');
});