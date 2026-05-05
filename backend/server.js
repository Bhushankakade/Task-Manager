require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const notFoundMiddleware = require("./middleware/notFoundMiddleware.js");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/tasks", require("./routes/taskRoutes"));

app.use(notFoundMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
