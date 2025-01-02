import https from "https";
import { Router } from "express";
// const https = require("https");
// const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  console.log("req is ", req.query);

  if (typeof req.query.src === "string") {
    https
      .get(req.query.src, (response) => {
        const data: Uint8Array[] = [];

        // const headerDate =
        //   res.headers && res.headers.date
        //     ? res.headers.date
        //     : "no response date";
        // console.log("Status Code:", res.statusCode);
        // console.log("Date in Response header:", headerDate);

        response.on("data", (chunk) => {
          data.push(chunk);
        });

        response.on("end", () => {
          const buff = Buffer.concat(data).toString();
          console.log("Forwarding to client: ", buff);
          const jsonBody = JSON.parse(buff);

          res.send(jsonBody);
        });
      })
      .on("error", (err) => {
        console.log("Error: ", err.message);
      });
  }
});

export default router;
