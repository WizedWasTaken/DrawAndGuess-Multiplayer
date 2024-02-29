# WebSocketService

Denne klasse håndterer WebSocket-forbindelser og rum.

## Metoder

### constructor(io)

Konstruktøren initialiserer en ny instans af WebSocketService. Den tager en `io` parameter, som er en instans af socket.io serveren.

### initializeSocket()

Denne metode initialiserer en ny WebSocket-forbindelse. Den lytter til forskellige begivenheder som "connection", "joinRoom", "createRoom", "message", "leaveRoom", "drawingData", og "clearCanvas".

### handleJoinRoom(socket, roomId, username)

Denne metode håndterer, når en bruger forsøger at tilslutte sig et rum. Den tager en `socket` parameter, som er socket-forbindelsen for brugeren, en `roomId` parameter, som er ID'et for rummet, og en `username` parameter, som er brugerens brugernavn.

### handleDrawingData(data, roomId)

Denne metode håndterer tegnedata fra en bruger. Den tager en `data` parameter, som er tegnedataen, og en `roomId` parameter, som er ID'et for rummet.

### generateRoomID()

Denne metode genererer et tilfældigt rum ID.

### createRoom(socket, username)

Denne metode opretter et nyt rum. Den tager en `socket` parameter, som er socket-forbindelsen for brugeren, og en `username` parameter, som er brugerens brugernavn.

### handleLeaveRoom(roomId, socket, username)

Denne metode håndterer, når en bruger forlader et rum. Den tager en `roomId` parameter, som er ID'et for rummet, en `socket` parameter, som er socket-forbindelsen for brugeren, og en `username` parameter, som er brugerens brugernavn.

### handleMessage(username, message, roomId)

Denne metode håndterer beskeder fra en bruger. Den tager en `username` parameter, som er brugerens brugernavn, en `message` parameter, som er beskeden, og en `roomId` parameter, som er ID'et for rummet.

# User

Denne klasse repræsenterer en bruger.

## Metoder

### constructor(socketId, username)

Konstruktøren initialiserer en ny instans af User. Den tager en `socketId` parameter, som er socket ID'et for brugeren, og en `username` parameter, som er brugerens brugernavn.
