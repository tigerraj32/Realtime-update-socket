var app = require('express')();
var useragent = require('express-useragent');

//-- user server(app) to bind http and socket connect via same port
var http = require('http').Server(app);

//-- user createServer() to bind http and socket connect in different port
//var http = require('http').createServer()
var io = require('socket.io')(http);
var toJson = require('to-json');


app.use(useragent.express());
app.get('/', (req, res)=>{
    
    console.log("Api / Web request token: ", req.query.token); 
    //res.send('<h1>iot sample project</h1>');
    res.sendfile('iot.html')
});

function boradcastDataExceptSender(socket,sensor,flag){
   
    var message = {sensor : sensor, flag: flag}
    socket.broadcast.emit('broadcast', message);
}

var connectedClient = [];
io.on('connection', (socket) =>{
    console.log(
        "Client Connected > > >" + 
        " socket id: " + socket.id +
        " token: " + socket.handshake.query.token
        );

        connectedClient.push(socket.id)
        console.log(connectedClient);

        /* socket handling for web updates*/
        socket.on("ot1", (data)=>{
            console.log("Over Head Sensor 1: ", data);
            boradcastDataExceptSender(socket,"ot1-update", data);

        });

        socket.on("ot2", (data)=>{
            console.log("Over Head Sensor 2: ", data);
            boradcastDataExceptSender(socket, "ot2-update", data);
        });
        socket.on("dt1", (data)=>{
            console.log("Under ground Sensor 1: ", data);
            boradcastDataExceptSender(socket,"dt1-update", data);
        });
        socket.on("dt2", (data)=>{
            console.log("Under Ground Sensor 2: ", data);
            boradcastDataExceptSender(socket,"dt2-update", data);
        });
        socket.on("manual", (data)=>{
            console.log("Manual Switch: ", data);
            boradcastDataExceptSender(socket,"manual-update", data);
        });


       /** Socket disconnect handler */
        socket.on('disconnect', (socket) => { 
            console.log(
                "Client Disconnected > > >" + 
                " socket id: " + socket.id 
                );
            var index = connectedClient.indexOf(socket.id);
            connectedClient.splice(index, 1);
            console.log(connectedClient);
        });


});


//socket listening port
http.listen(4040, function() {
    console.log('socket listening on *:4040');
 });

//  //api listening port
// app.listen(4041, function(){
//     console.log('api listening on *:4041');
// });