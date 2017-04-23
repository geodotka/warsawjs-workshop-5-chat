const yaml = require('js-yaml');    // https://github.com/nodeca/js-yaml
const fs = require('fs');
const config = yaml.safeLoad(fs.readFileSync('./config/server.yaml'));

const io = require('socket.io')(config.serverPort); // wywołujemy z argumentem portu
const ChatServer = require('./lib/ChatServer');
const DummyAuthenticator = require('./lib/DummyAuthenticator');

const authenticator = new DummyAuthenticator({
    user1: 'pass1',
    user2: 'pass2'
});
const server = new ChatServer({ io, authenticator });
server.init();

// console.log(__dirname); // pokazuje aktualną ściżkę. require resolvuje ścieżki od aktualnego kataogu
