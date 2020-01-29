## 1. Monitor for client connection
```javascript 
io.on('connect', onConnect);
function onConnect(socket){
{ code after connection}
}
```


  ## 2. Sending to the client
  ```javascript 
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');
  ```

  ## 3. Sending to all clients except sender
  ```javascript 
  socket.broadcast.emit('broadcast', 'hello friends!');
 ```
  ## 4. sending to all clients in 'game' room except sender
  ```javascript 
  socket.to('game').emit('nice game', "let's play a game");
  ```

  ## 5. sending to all clients in 'game1' and/or in 'game2' room, except sender
  ```javascript 
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");
  ```

   ## 6.sending to all clients in 'game' room, including sender
  ```javascript 
  io.in('game').emit('big-announcement', 'the game will start soon');
  ```
  ## 7.sending to all clients in namespace 'myNamespace', including sender
  ```javascript 
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');
  ```
  ## 8. sending to a specific room in a specific namespace, including sender
  ```javascript 
  io.of('myNamespace').to('room').emit('event', 'message');
  ```
  
  ## 9. sending to individual socketid (private message)
  ```javascript 
  io.to(`${socketId}`).emit('hey', 'I just met you');
  
  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.
  ```
  ## 10. sending with acknowledgement
  ```javascript 
  socket.emit('question', 'do you think so?', function (answer) {});
  ```
  
  ## 11. sending without compression
  ```javascript 
  socket.compress(false).emit('uncompressed', "that's rough");
  ```
  
  ## 12. sending a message that might be dropped if the client is not ready to receive messages
  ```javascript 
  socket.volatile.emit('maybe', 'do you really need it?');
  ```
  
  ## 13. specifying whether the data to send has binary data
  ```javascript 
  socket.binary(false).emit('what', 'I have no binaries!');
  ```
  
  ## 14. sending to all clients on this node (when using multiple nodes)
  ```javascript 
  io.local.emit('hi', 'my lovely babies');
  ```
  
  ## 15. sending to all connected clients
  ```javascript 
  io.emit('an event sent to all connected clients');
  //or
  io.sockets.emit('broadcast', {"ot1-update":data});
  ```
