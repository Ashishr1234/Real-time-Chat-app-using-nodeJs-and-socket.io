// Node server which will handle socket io connections
const io = require('socket.io')(8080)

const users = {};

io.on('connection', socket =>{
    socket.on('new-user-joined', naame =>{
     // If any new user joins, let other users connected to the server know!
        users[socket.id] = naame;
        socket.broadcast.emit('user-joined', naame);

    });
    
    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, naame: users[socket.id]})
    });

    // If someone leaves the chat, let others know
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

