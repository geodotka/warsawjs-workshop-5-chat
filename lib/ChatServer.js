class ChatServer {
    constructor({ io }) {
        this._io = io;
    }

    init() {
        const io = this._io;

        io.on('connection', function (socket) {
            let clientData = {
                    login: null
                };
            socket.on('message', function({ body }){
                if (clientData.login) {
                    io.sockets.emit('message', { body, from: clientData.login });   // jak przyjdzie wiadomość, wyśle do wszystkich klientów
                }
            });
            socket.on('login', function({ login, password }) {
                clientData.login = login;
                socket.emit('login', { result: true });
            })
        });
    }
}

// module to zmienna per module, nie jest globalna; domyślnie jest pustym obiektem
module.exports = ChatServer;
// require('./ChatServer');

//module.exports.ChatServer = ChatServer;
// require('./ChatServer').ChatServer;