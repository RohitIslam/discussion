const express = require("express");
const path = require("path");
const connectDB = require("./config/dbConfig");

const app = express();

// database connection start
connectDB();

//Middlewares start

// //Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Middlewares end

//Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

//Serve static assets in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.send(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

//start server at port 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
