class WebSocketService {
  constructor(io) {
    this.io = io;
  }

  initializeSocket() {
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('joinRoom', (roomId) => {
        this.handleJoinRoom(socket, roomId);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
  }

  handleJoinRoom(socket, roomId) {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
    this.io.to(roomId).emit('roomJoined', {
      roomId: roomId,
      message: 'A new user has joined the room.',
    });
  }
}

module.exports = WebSocketService;
