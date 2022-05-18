const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

app.use(express.json())
const reposRoutes = require("./routes/reposRoutes");

// setting default base endpoint path
app.use("/repos", reposRoutes)

module.exports = app;