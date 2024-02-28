class WebSocketService {
  constructor(io) {
    this.io = io;
    this.rooms = {};
  }

  initializeSocket() {
    this.io.on('connection', (socket) => {
      console.log('User connected', socket.id);
      socket.on('joinRoom', (roomId, username) => {
        this.handleJoinRoom(socket, roomId, username);
      });
      socket.on('createRoom', (username) => {
        this.createRoom(socket, username);
      });

      socket.on('message', (username, message, roomId) => {
        this.handleMessage(username, message, roomId);
      });

      socket.on('leaveRoom', (roomId, username) => {
        this.handleLeaveRoom(roomId, socket, username);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        if (
          this.rooms === undefined ||
          this.rooms.length === 0 ||
          this.rooms === null
        ) {
          return;
        } // Hvis der ikke er nogen rum, så returner

        // OBJEKTER ER NOGET FUCKING LORT 🤢🤢
        Object.keys(this.rooms).forEach((roomId) => {
          const room = this.rooms[roomId];
          if (room.users.hasOwnProperty(socket.id)) {
            this.handleLeaveRoom(
              roomId,
              socket,
              room.users[socket.id].username
            );
          }
        });
        socket.leaveAll();
      });
    });
  }

  handleJoinRoom(socket, roomId, username) {
    // Hvis roomId er tomt
    if (roomId == '' || roomId == undefined) {
      socket.emit('error', 'Indtast et rum id');
      return;
    }
    // Hvis rummet ikke eksisterer
    if (!this.rooms[roomId]) {
      socket.emit('error', `Rum "${roomId}" findes ikke.`);
      return;
    }

    // Er det her muligt lol 💀
    if (this.rooms[roomId].users.hasOwnProperty(socket.id)) {
      socket.emit('error', `${socket.id} er allerede i rum ${roomId}.`);
      return;
    }

    socket.join(roomId);
    let newUser = new User(socket.id, username);
    this.rooms[roomId].users[newUser.socketId] = newUser;

    // Funktion til at bevare chat historik 😊😊
    this.rooms[roomId].messages.forEach((message) => {
      socket.emit('message', message);
    });

    // Send en besked til rummet om at brugeren har tilsluttet sig rummet
    this.handleMessage(
      'System',
      `${username} har tilsluttet sig rummet.`,
      roomId
    );

    // Send en besked til alle i rummet om at opdatere brugerlisten
    this.io.to(roomId).emit('users', Object.values(this.rooms[roomId].users));
    socket.emit('joinedRoom', roomId);

    const usersInRoom = Object.values(this.rooms[roomId].users);
    this.io.to(roomId).emit('users', usersInRoom);
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
    socket.emit('room created', roomID);
    this.rooms[roomID].messages = [];
    this.handleMessage(
      'System',
      `Rum ${roomID} er blevet oprettet af ${username}.`,
      roomID
    );
    this.io.to(roomID).emit('users', Object.values(this.rooms[roomID].users));
  }

  /**
   * 🏃‍♀️ handleLeaveRoom - Når en bruger forlader et rum
   *
   * @param {string} roomId - ID'et på rummet
   * @param {object} socket - Socket-objektet for brugeren
   * @param {boolean} isHost - Angiver om brugeren er værten for rummet
   * @param {string} username - Brugerens brugernavn
   *
   * @returns {void}
   */
  handleLeaveRoom(roomId, socket, username) {
    // Tjek om brugeren er i rummet
    // Hvis ikke, så returner
    if (
      !this.rooms.hasOwnProperty(roomId) ||
      !this.rooms[roomId].users.hasOwnProperty(socket.id)
    ) {
      return;
    }

    // Hvis brugeren er værten, så slet rummet
    if (socket.id === this.rooms[roomId].host.socketId) {
      this.io.to(roomId).emit('roomLeft'); // roomLeft event fordi alle skal skride fra rummet 💪🏿
      this.io.to(roomId).emit('error', 'Værten har forladt rummet.');
      delete this.rooms[roomId];
      return;
    }

    // Hvis brugeren ikke er værten, så slet brugeren fra rummet
    delete this.rooms[roomId].users[socket.id];
    this.io.to(roomId).emit('users', Object.values(this.rooms[roomId].users));

    // Send en besked til rummet om at brugeren har forladt rummet
    this.handleMessage('System', `${username} har forladt rummet.`, roomId);
  }

  handleMessage(username, message, roomId) {
    this.rooms[roomId].messages.push({ username, message });
    this.io.to(roomId).emit('message', {
      username: username,
      message: message,
    });
  }
}

class User {
  constructor(socketId, username) {
    this.socketId = socketId;
    this.username = username;
  }
}

module.exports = WebSocketService;
