// src/index.ts
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import dataProxyRouter from "./routes/dataProxyRouter";
import { createServer } from "http";

dotenv.config();

/*
 * Create an Express application and get the
 * value of the PORT environment variable
 * from the `process.env`
 */
const app: Express = express();
const server = createServer(app);
app.use(express.json()); // Accept and parse JSON data.
app.use(cors()); // Enable CORS for all requests.
const port = process.env.PORT || 3000;

/* Define a route for the root path ("/")
 using the HTTP GET method */
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

//Custom Middlware
app.use((req, res, next) => {
  console.log(`A ${req.method} request was made to ${req.url}`);
  next();
});

app.use("/dataProxy", dataProxyRouter);

/* Start the Express app and listen
 for incoming requests on the specified port */
// app.listen(port, () => {
//   console.log(`[server]: Server is running at http://localhost:${port}`);
// });

server.listen(port, () => {
  console.log(`server running at http://localhost:${port}`);
});
