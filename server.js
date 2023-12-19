const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
dotenv.config({ path: "./.env" });

const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

const app = express();
const server = http.createServer(app);


// Configuring CORS for Socket.io
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Replace with your client's URL
    methods: ["GET", "POST"],
    credentials: true
  }
});

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your client app's URL
  credentials: true // Allow cookies/session to be sent between client and server
}));


app.use(express.json());
connectDB(); // Connect to database

app.set('io', io); // Make io available in request object

// API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/salesforce-webhook", require("./routes/salesforceWebhook"));



// --------------------------DEPLOYMENT------------------------------

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    return res.sendFile(
      path.resolve(__dirname, "client", "build", "index.html")
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

// --------------------------DEPLOYMENT------------------------------

// Error Handler Middleware (Should be at the end of all middlewares)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on PORT ${PORT}`)
);

// Handling server errors with clean error messages
process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
