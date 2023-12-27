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
const imageRoutes = require('./routes/image');



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
  credentials: true
}));


app.use(express.json());
connectDB(); 

app.set('io', io);



// Serve static files from uploads (for image uploads)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// API Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/private", require("./routes/private"));
app.use("/api/salesforce-webhook", require("./routes/salesforceWebhook"));
app.use("/api/user-management", require("./routes/userManagement"));
app.use("/api/images", require("./routes/image"));



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
