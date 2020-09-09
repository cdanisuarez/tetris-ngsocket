const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const event = {
  keyCode: 80,
};

io.on("connection", socket => {
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };

  socket.on("getEvent", eventId => {
    safeJoin(eventId);
    socket.emit("event", events[eventId]);
  });

  socket.on("addEvent", event => {
    events[event.id] = event;
    safeJoin(event.id);
    io.emit("events", Object.keys(events));
    socket.emit("event", event);
  });

  socket.on("editEvent", event => {
    events[event.id] = event;
    socket.to(event.id).emit("event", event);
  });

  io.emit('event', event);
  // io.emit("events", events);
});

http.listen(4444, () => {
  console.log('Server API listeting by', 4444, 'port.');
});