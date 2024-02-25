function joinRoom(socket, data) {
  console.log(`${data.user} joined room: ${data.room}`);
  socket.join(data.room);
  socket.to(data.room).emit('userJoined', { user: data.user });
}

function sendMessage(socket, data) {
  console.log(`Message from ${data.user} in ${data.room}: ${data.message}`);
  socket
    .to(data.room)
    .emit('newMessage', { user: data.user, message: data.message });
}

module.exports = {
  joinRoom,
  sendMessage,
};
