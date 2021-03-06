const connection = require('socket.io-client')('http://localhost:3000');
const readline = require('readline');
// moduł readline będzie nam zarządzał wiadomościami, czytał linie, czyścił itp.
const rl = readline.createInterface({
    input: process.stdin, // process jest zmienną globalną w nodzie
    output: process.stdout
});
const util = require('util');
const EOL = require('os').EOL;
const colors = require('colors');


// ### Utility functions ###

function writeLine(line, ...args) {
   process.stdout.clearLine();
   process.stdout.cursorTo(0);
   process.stdout.write(util.format(line, ...args) + EOL);
   rl.prompt(true);
}

// ### Message handler ###

let credentials = null;
let connected = false;


function sendLogin() {
    connection.emit('login', credentials);
}

function sendRegister() {
    connection.emit('register', credentials);
}

connection.on('connect', function() {
    writeLine('* Connected to chat server!');
    connected = true;
    if (credentials) {
        sendLogin();
    }
});

connection.on('disconnect', function() {
    writeLine('* Disconnected to chat server!'.yellow);
    connected = false;
});

connection.on('message', function({ from, body }){    // { body } jest wypakowanie obiektu zgodnie z ES6
    writeLine('* %s: %s', from, body);
});

connection.on('login', function({ result }){
    if (result === true) {
        rl.setPrompt(`${credentials.login}> `);
        writeLine('* Successfully logged in!'.green);
    } else {
        writeLine('! Failed to log in.'.red)
    }
});

connection.on('register', function({ result }) {
    if (result === true) {
        writeLine('* Successfully registered!'.green);
        sendLogin()
    } else {
        writeLine('! Failed to register.'.red)
    }
});

connection.on('join', function({ login }) {
    writeLine('* %s logged in!'.blue, login);
});

connection.on('leave', function({ login }) {
    writeLine('* %s logged out!'.cyan, login);
});

rl.setPrompt('> ');
rl.prompt();


const commandHandlers = {
    login: function handlerLogin(login, password) {
        credentials = { login, password };
        if (connected) {
            sendLogin();
        }
    },
    register: function handlerRegister(login, password) {
        credentials = { login, password };
        if (connected) {
            sendRegister();
        }
    }
};

rl.on('line', function(line){
    if (line[0] === '/') {
        const commandParts = line.slice(1).split(' ').filter((part) => part.length > 0);
        const commandName = commandParts[0];
        const commandArgs = commandParts.slice(1);
        if (commandHandlers[commandName]) {
            commandHandlers[commandName].apply(undefined, commandArgs);
        }
    } else {
        connection.emit('message', { body: line});
    }
    rl.prompt();
});
