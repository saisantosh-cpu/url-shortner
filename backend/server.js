const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const urlRoutes = require("./routes/urlRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// 🔴 IMPORTANT: choose ONE option below

// OPTION A: Local MongoDB
mongoose.connect(process.env.MONGO_URI);
// OPTION B: MongoDB Atlas (replace with your connection string)
// mongoose.connect("your_mongodb_atlas_url");

app.use("/", urlRoutes);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});