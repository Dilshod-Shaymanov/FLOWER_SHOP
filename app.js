const express = require("express");
require("dotenv").config();
const PORT = process.env.PORT || 3003;

// const mainRouter = require("./routes/index")
const mainRouter = require("./routes");

const app = express();

app.use(express.json());

app.use("/api", mainRouter);

app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
