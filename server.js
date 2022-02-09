// const { createServer } = require('http');
// const { parse } = require('url');
const express = require("express");
const next = require("next");
require("dotenv").config();

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = process.env.PORT;
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // server.use(function (req, res, next) {
  //   //allow cross origin requests
  //   const origin =
  //     req.headers.origin == `http://${hostname}:${port}`
  //       ? `http://${hostname}:${port}`
  //       : "https://solastore.com.tr";
  //   res.setHeader("Access-Control-Allow-Methods", "POST, GET");
  //   res.header("Access-Control-Allow-Origin", origin);
  //   res.header(
  //     "Access-Control-Allow-Headers",
  //     "Origin, X-Requested-With, Content-Type, Accept"
  //   );
  //   res.header("Access-Control-Allow-Credentials", true);
  //   next();
  // });

  server.set("trust proxy", 1);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) {
      console.error(err);
      throw err;
    }
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
