const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http'); // Required for creating the HTTP server
const { Server: SocketIOServer } = require('socket.io');

// Assuming createServer is exported as a CommonJS module
const routes = require('./routes/createServer');

// ENV Setup
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000; // Provide a default value for PORT

// MongoDB connection
mongoose.Promise = global.Promise;
mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

// Body-parser setup
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// CORS setup
app.use(cors());

// Initialize routes
routes(app);

// HTTP Server
const httpServer = http.createServer(app);

// Websocket setup
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const WebSocketService = require('./services/WebSocketServices');
const webSocketService = new WebSocketService(io);
webSocketService.initializeSocket();

// Static files (Images, Videos etc.)
app.use('/assets', express.static('assets'));

// Root route
app.get('/', (req, res) => {
  res.send(`API is online...`);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
