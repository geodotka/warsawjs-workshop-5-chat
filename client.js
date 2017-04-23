const connection = require('socket.io-client')('http://localhost:3000');

connection.on('message', function({ body }){    // { body } jest wypakowanie obiektu zgodnie z ES6
    console.log('* Server says: %s', body)
});
