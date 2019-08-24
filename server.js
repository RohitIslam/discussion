const express = require("express");
const connectDB = require("./config/dbConfig");

const app = express();

// database connection start
connectDB();

//Middlewares start

// //Body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// //Passport Middleware
// app.use(passport.initialize());
// require("./config/passport")(passport);

//Middlewares end

//Use Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/auth", require("./routes/api/auth"));

//start server at port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
