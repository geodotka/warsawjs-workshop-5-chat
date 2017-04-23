const io = require('socket.io')(3000); // wywołujemy z argumentem portu

io.on('connection', function (socket) {
    socket.on('message', function({ body }){
        io.sockets.emit('message', { body });   // jak przyjdzie wiadomość, wyśle do wszystkich klientów
    });
});
