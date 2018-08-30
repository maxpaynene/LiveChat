var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'))

app.get('/data', (req,res) => {
  res.status(200).send('hello world');
});

var messages = [{
    id:1,
    text:'Bienvenido al Chat Privado',
    nickname:'bot'
}];

io.on('connection', (socket) => {
  console.log('nueva coneccion desde: ',socket.handshake.address);
  socket.emit('messages',messages);
  socket.on('add-message', (data) => {
    console.log('pusheando contenido al array');
    messages.push(data);
    io.sockets.emit('messages',messages);
  })
});

server.listen(6677,() => {
  console.log('server up');
});
