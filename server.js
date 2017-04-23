const config = require('./config/server.json');

const io = require('socket.io')(config.socketPort); // wywołujemy z argumentem portu
const ChatServer = require('./lib/ChatServer');

// console.log(__dirname); // pokazuje aktualną ściżkę. require resolvuje ścieżki od aktualnego kataogu

const server = new ChatServer({ io });
server.init();
