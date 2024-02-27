class WebSocketService {
  constructor(io) {
    this.io = io;
    this.rooms = {};
  }

  initializeSocket() {
    this.io.on("connection", (socket) => {
      console.log("A user connected");

      socket.on("joinRoom", (roomId, username) => {
        this.handleJoinRoom(socket, roomId, username);
      });
      socket.on("createRoom", (username) => {
        this.createRoom(socket, username);
      });

      socket.on("message", (username, message, roomId) => {
        this.handleMessage(username, message, roomId);
      });

      socket.on("leaveRoom", (roomId, socket, isHost, username) => {
        console.log("leaveRoom", roomId, socket, isHost, username);
        this.handleLeaveRoom(roomId, socket, isHost, username);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected");

        socket.leaveAll();
      });

      setInterval(() => {
        console.log(this.rooms);
      }, 1000);
    });
  }

  handleJoinRoom(socket, roomId, username) {
    // Hvis rummet ikke eksisterer
    if (!this.rooms[roomId]) {
      socket.emit("error", `Room ${roomId} does not exist.`);
      return;
    }

    // Er det her muligt lol 💀
    if (this.rooms[roomId].users.hasOwnProperty(socket.id)) {
      socket.emit("error", `${socket.id} er allerede i rum ${roomId}.`);
      return;
    }

    socket.join(roomId);
    let newUser = new User(socket.id, username);
    this.rooms[roomId].users.push(newUser);

    this.io.to(roomId).emit("roomJoined", {
      roomId: roomId,
    });

    this.io.to(roomId).emit("message", {
      username: "System",
      message: `${username} har tilsluttet sig rummet.`,
    });

    const user = new User(socket.id, username);
    this.rooms[roomId].users[socket.id];

    this.io.to(roomId).emit("users", this.rooms[roomId].users);
    socket.emit("joinedRoom", roomId);

    const usersInRoom = Object.values(this.rooms[roomId].users);
    this.io.to(roomId).emit("users", usersInRoom);
  }

  generateRoomID() {
    return Math.random().toString(36).substring(2, 9);
  }

  createRoom(socket, username) {
    const roomID = this.generateRoomID();
    const user = new User(socket.id, username);
    this.rooms[roomID] = {
      host: user,
      users: { [socket.id]: user },
    };
    socket.join(roomID);
    socket.emit("room created", roomID);
  }

  handleMessage(username, message, roomId) {
    username = username || "Anonymous";
    console.log("message", username, message);
    this.io.to(roomId).emit("message", {
      username,
      message,
    });
  }

  // Problemet er at den emitter til alle spillere i rummet uanset, selvom brugeren er host eller ej.
  handleLeaveRoom(roomId, socket, isHost, username) {
    if (isHost) {
      this.io.to(roomId).emit("roomLeft", {
        roomId: roomId,
        message: `Rum ${roomId} er blevet lukket af hosten.`,
      });
      delete this.rooms[roomId].users[socket.id];
    } else {
      console.log("handleLeaveRoom", roomId, socket, isHost, username);
      console.log(this.rooms[roomId].users);
      this.rooms[roomId].users = this.rooms[roomId].users.filter(
        (player) => player !== socket.id
      );
      this.io.to(roomId).emit("message", {
        username: "System",
        message: `${username} har forladt rummet.`,
      });
      const usersInRoom = Object.values(this.rooms[roomId].users);
      this.io.to(roomId).emit("users", usersInRoom);
    }
  }
}

class User {
  constructor(socketId, username) {
    this.socketId = socketId;
    this.username = username;
  }
}

module.exports = WebSocketService;
