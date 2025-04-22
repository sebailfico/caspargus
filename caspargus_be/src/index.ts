// src/index.ts
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataProxyRouter from "./routes/dataProxyRouter";
import { createServer } from "http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";
import history from "connect-history-api-fallback";
import { useSocketIoServer } from "./socket.io/server";
import { MongoService } from "./services/mongoService";

dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app = express();
app.use(express.json()); // Accept and parse JSON data.
app.use(cors()); // Enable CORS for all requests.

const server = createServer(app);
useSocketIoServer(server);

const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

export const mongoService = new MongoService();

mongoService.connect();

// app.use("/", express.static(join(__dirname, "/../../caspargus_fe/dist")));

// const staticFileMiddleware = express.static(
//   __dirname + "/../../caspargus_fe/dist"
// );
// app.use(staticFileMiddleware);
// app.use(
//   history({
//     disableDotRule: true,
//     verbose: true,
//   })
// );
// app.use(staticFileMiddleware);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "/index.html"));
});

// app.get("/", (req, res) => {
//   // send a hello world response
//   res.send("Hello, World!");
// });

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
