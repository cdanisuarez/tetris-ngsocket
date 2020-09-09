const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const KEYS = require('./keys.constant');

const PORT = 4100;
const API = '/api/tetris/';
let event = {};

app.use(bodyParser.json());

app.post(API, (req, res) => {
  let error = {
    message: ''
  };

  const success = {
    message: 'Movimiento exitoso'
  };

  const body = req.body;

  if (!body) {
    error.message = 'Falta el cuerpo de la petición';
    return res.status(400).send(error);
  }

  if (!body.keyCode) {
    error.message = 'Debe enviar un keyCode';
    return res.status(400).send(error);
  }

  if (validateKeyCode(body.keyCode)) {
    event = req.body;
    io.emit('event', event);
    return res.status(200).send(success);
  } else {
    error.message = 'Este keyCode no es valido';
    return res.status(400).send(error);
  }
});

const validateKeyCode = (keyCode) => {
  const isValid = true;
  for (const objKey of KEYS) {
    if (objKey.keyCode === keyCode) {
      return isValid;
    }
  }

  return !isValid;
}

io.on('connection', socket => {
  /*socket.on('getEvent', eventId => {
    safeJoin(eventId);
    socket.emit('event', events[eventId]);
  });

  socket.on('addEvent', event => {
    events[event.id] = event;
    safeJoin(event.id);
    io.emit('events', Object.keys(events));
    socket.emit('event', event);
  });

  socket.on('editEvent', event => {
    events[event.id] = event;
    socket.to(event.id).emit('event', event);
  });*/

  io.emit('event', event);
});

http.listen(PORT, () => {
  console.log('Server API listeting by', PORT, 'port.');
});