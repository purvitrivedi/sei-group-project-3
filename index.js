const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");
const errorHandler = require("./lib/errorHandler");
const router = require("./config/routes");
const logger = require("./lib/logger");

const port = process.env.PORT ? process.env.PORT : "8000";

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.static(`${__dirname}/frontend/build`));

app.use(bodyParser.json());

app.use(logger);

app.use("/api", router);

app.use("/*", (req, res) =>
  res.sendFile(`${__dirname}/frontend/build/index.html`)
);

app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
