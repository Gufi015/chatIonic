let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

io.on('connection', (socket) => {
  socket.on('disconnect', function () {
    io.emit('user-change', { user: socket.nickName, event: 'left'});
  });

  socket.on('set-nickName', (nickName) => {
    socket.nickName = nickName;
    io.emit('user-change', {user: nickName, event: 'joined'});
  });

  socket.on('add-message', (message) => {
    io.emit('message', {text: message.text, from: socket.nickName, created: new Date()});
  });
});

var port = process.env.PORT || 3001; 

http.listen(port, function () {
  console.log('Listen to http://localhost:3001:' + port);
});
