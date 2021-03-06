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
                            if (clientData.login && clientData.login !== login) {
                                io.sockets.emit('leave', { login: clientData.login })
                            }
                            clientData.login = login;
                            socket.emit('login', { result: true });
                            io.sockets.emit('join', { login: login })
                        } else {
                            socket.emit('login', { result: false });
                        }
                    })
                    .catch(function validationError(error) {
                        socket.emit('login', {result: false, error})
                    })
            });
            socket.on('register', function({ login, password }) {
                authenticator.register(login, password)
                    .then(function () {
                        socket.emit('register', {result: true})
                    })
                    .catch(function (error) {
                        socket.emit('register', {result: false, error})
                    })
            });
            socket.on('disconnect', function() {
                io.sockets.emit('leave', { login: clientData.login })
            })
        });
    }
}

// module to zmienna per module, nie jest globalna; domyślnie jest pustym obiektem
module.exports = ChatServer;
// require('./ChatServer');

//module.exports.ChatServer = ChatServer;
// require('./ChatServer').ChatServer;
