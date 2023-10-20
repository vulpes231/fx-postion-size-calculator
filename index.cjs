const express = require("express");
const {
  requestLogger,
  errorLogger,
} = require("./middlewares/event-logger.cjs");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 6000;

// import and use the connectDB() function here. dont forget to add ur URI to the .env file

app.use(requestLogger);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use("/calculate", require("./routes/calculate.cjs"));

app.use(errorLogger);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
