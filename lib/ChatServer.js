class ChatServer {
    constructor({ io, authenticator }) {
        this._io = io;
        this._authenticator = authenticator;
    }

    init() {
        const io = this._io;
        const authenticator = this._authenticator;

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
                authenticator.validate(login, password)
                    .then(function validationFinished(result) {
                        if (result) {
                            clientData.login = login;
                            socket.emit('login', { result: true });
                        } else {
                            socket.emit('login', { result: false });
                        }
                    })
                    .catch(function validationError(error) {
                        socket.emit('login', {result: false, error: error})
                    })
            })
        });
    }
}

// module to zmienna per module, nie jest globalna; domyślnie jest pustym obiektem
module.exports = ChatServer;
// require('./ChatServer');

//module.exports.ChatServer = ChatServer;
// require('./ChatServer').ChatServer;
