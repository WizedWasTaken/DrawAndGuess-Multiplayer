class WebSocketService {
  constructor(io) {
    this.io = io;
    this.rooms = {};
  }

  initializeSocket() {
    this.io.on('connection', (socket) => {
      console.log('A user connected');

      socket.on('joinRoom', (roomId) => {
        this.handleJoinRoom(socket, roomId);
      });
      socket.on('createRoom', () => {
        this.createRoom(socket);
      });

      socket.on('message', (username, message, socket) => {
        message = username.trim();
        username = 'Anonymous';
        this.handleMessage(username, message, socket.roomId);
      });

      socket.on('leaveRoom', (roomId, socket, isHost) => {
        console.log('leaveRoom', roomId, socket, isHost);
        if (isHost) {
          this.io.to(roomId).emit('roomLeft', {
            roomId: roomId,
            message: `Room ${roomId} has been closed by the host.`,
          });
          delete this.rooms[roomId];
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');

        for (const room in this.rooms) {
          console.log('room', room, this.rooms[room].players, socket.id);
          if (this.rooms[room].players.includes(socket.id)) {
            this.rooms[room].players = this.rooms[room].players.filter(
              (player) => player !== socket.id
            );

            this.io.to(room).emit('roomLeft', {
              roomId: room,
              message: `User ${socket.id} has left the room.`,
            });
          }
        }

        for (const room in this.rooms) {
          if (this.rooms[room].host === socket.id) {
            delete this.rooms[room];
          }
        }

        socket.leaveAll();

        console.log(this.rooms);
      });
    });
  }

  handleJoinRoom(socket, roomId) {
    // Hvis rummet ikke eksisterer
    if (!this.rooms[roomId]) {
      socket.emit('error', `Room ${roomId} does not exist.`);
      return;
    }

    // Er det her muligt lol 💀
    if (this.rooms[roomId].players.includes(socket.id)) {
      socket.emit('error', `User ${socket.id} is already in room ${roomId}.`);
      return;
    }

    socket.join(roomId);
    this.rooms[roomId].players.push(socket.id);

    this.io.to(roomId).emit('roomJoined', {
      roomId: roomId,
    });

    socket.emit('joinedRoom', roomId);
  }

  generateRoomID() {
    return Math.random().toString(36).substring(2, 9);
  }

  createRoom(socket) {
    const roomID = this.generateRoomID();
    this.rooms[roomID] = {
      host: socket.id,
      players: [socket.id],
    };
    socket.join(roomID);
    socket.emit('room created', roomID);
  }

  handleMessage(username, message, roomId) {
    username = username || 'Anonymous';
    console.log('message', username, message, roomId);
    this.io.to(roomId).emit('message', {
      username,
      message,
    });
  }
}

module.exports = WebSocketService;
