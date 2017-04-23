const io = require('socket.io')(3000); // wywołujemy z argumentem portu

io.on('connection', function (socket) {
  socket.emit('message', { body: 'Hello client!' });
});
