class WebSocketService {
  constructor(io) {
    this.io = io;
    this.rooms = {};
  }

  initializeSocket() {
    this.io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("joinRoom", (roomId) => {
        this.handleJoinRoom(socket, roomId);
      });
      socket.on("createRoom", () => {
        console.log("User is trying to create a room");
        const roomID = this.generateRoomID();
        this.rooms[roomID] = {
          host: socket.id,
          players: [socket.id],
        };
        console.log(`Room created: ${roomID}`);
        socket.join(roomID);
        socket.emit("room created", roomID);
      });

      socket.on("message", (message) => {
        console.log("Message received: ", message);
        this.io.emit("message", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");

        for (const room in this.rooms) {
          if (this.rooms[room].players.includes(socket.id)) {
            this.rooms[room].players = this.rooms[room].players.filter(
              (player) => player !== socket.id
            );

            this.io.to(room).emit("roomJoined", {
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
    const MAX_PLAYERS = 2;

    if (!this.rooms[roomId]) {
      socket.emit("error", `Room ${roomId} does not exist.`);
      return;
    }

    if (this.rooms[roomId].players.includes(socket.id)) {
      socket.emit("error", `User ${socket.id} is already in room ${roomId}.`);
      return;
    }

    socket.join(roomId);
    this.rooms[roomId].players.push(socket.id);

    this.io.to(roomId).emit("roomJoined", {
      roomId: roomId,
    });

    socket.emit("joinedRoom", roomId);
  }

  generateRoomID() {
    return Math.random().toString(36).substring(2, 9);
  }
}

module.exports = WebSocketService;
