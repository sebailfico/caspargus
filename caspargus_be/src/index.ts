// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataProxyRouter from "./routes/dataProxyRouter";
import { createServer } from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";

dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = express();
const server = createServer(app);
const io = new Server(server);
app.use(express.json()); // Accept and parse JSON data.
app.use(cors()); // Enable CORS for all requests.
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});

// app.use("/dataProxy", dataProxyRouter);

// //Custom Middlware
// app.use((req, res, next) => {
//   console.log(`A ${req.method} request was made to ${req.url}`);
//   next();
// });

/* Start the Express app and listen
 for incoming requests on the specified port */
// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });
server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
