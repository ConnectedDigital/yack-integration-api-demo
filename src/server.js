// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
const io = require('socket.io')(http);
app.use(express.json());

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use('/static', express.static(path.join(__dirname, 'public')));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', (request, response) => {
    response.sendFile(__dirname + '/views/index.html');
});

app.post('/test', (request, response) => {
    console.log(request.body);
    io.emit('message-received', request.body);
    response.json(request.body);
});

io.on('connection', socket => {
    console.log('a user connected');
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


// listen for requests :)
const listener = http.listen(process.env.PORT | 51002, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
