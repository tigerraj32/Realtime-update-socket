var app = require('express')();
var useragent = require('express-useragent');

//-- user server(app) to bind http and socket connect via same port
//var http = require('http').Server(app);

//-- user createServer() to bind http and socket connect in different port
var http = require('http').createServer()
var io = require('socket.io')(http);
var toJson = require('to-json');

var userList = [];

app.use(useragent.express());
app.get('/', function(req, res) {
   //console.log(req.query.token, req.useragent); 
   console.log("api request with token: ", req.query.token); 
   res.sendfile('index.html');
});

// app.get('/', function(req, res){
//     res.send('<h1>Chat App ( Node: Server, iOS: Client )</h1>');
//   });

//socket listening port
http.listen(3000, function() {
    console.log('socket listening on *:3000');
 });

 //api listening port
app.listen(4000, function(){
    console.log('api listening on *:4000');
});

 //#1 Socket connection by client
io.on('connection', (socket) => { 
   
    console.log(
        "Client Connected > > >" + 
        " socket id: " + socket.id +
        " token: " + socket.handshake.query.token
        );
    
    //step 2
    socket.on('connectUser', (data) => {
        console.log("User " + data + " was connected");
        
        var userInfo = {};
        var userExist = false;

        for(var i=0; i<userList.length; i++) {
            if (userList[i]["nickname"] == data) {
                userExist = true;
                userList[i]["online"] = true;
                userList[i]["id"] = socket.id;
                userInfo = userList[i];
                break;
            }
        }
        if(!userExist){
            userInfo["socketid"] = socket.id;
            userInfo["nickname"] = data;
            userInfo["online"] = true
            userList.push(userInfo);

        }
        console.log(userList);
       

        io.emit("userList", toJson(userList));
        io.emit("userConnectUpdate", toJson(userInfo));

    }) ;   

    socket.on('disconnect', (socket) => { 
        console.log("Client disconnected");
        
        for(var i=0; i<userList.length; i++){
            if (userList[i]["socketid"] == socket.id){
                userList[i]["online"] = false;
                var nickname = userList[i]["nickname"];
                
                io.emit("userList", toJson(userList));
                
            }
        }

     });

 });