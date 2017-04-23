class ChatServer {
    constructor({ io }) {
        this._io = io;
    }

    init() {
        const io = this._io;
        io.on('connection', function (socket) {
            socket.on('message', function({ body }){
                let login = null;
                io.sockets.emit('message', { body });   // jak przyjdzie wiadomość, wyśle do wszystkich klientów
            });
        });
    }
}

// module to zmienna per module, nie jest globalna; domyślnie jest pustym obiektem
module.exports = ChatServer;
// require('./ChatServer');

//module.exports.ChatServer = ChatServer;
// require('./ChatServer').ChatServer;
