const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");

const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/config.env" });
// Connect to database
const { connectDB, syncedDB, disconnectDB } = require("./models/db.config");
connectDB();
 syncedDB();

const app = express();

// Body parser
app.use(express.json());
app.use(cookieParser());

// Dev logging middleware
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(
  cors({
    // origin: true,
    // origin: "http://127.0.0.1:5501",
    origin: "https://skye-trade.com",
    credentials: true,
  })
);

// Route files
const authRoute = require("./routes/auth");
const dashboardRoute = require("./routes/dashboard");
const admin = require("./routes/admin");
const { send } = require("process");

// Mount routers
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/dashboard", dashboardRoute);
app.use("/api/v1/admin", admin);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${process.env.SERVER_ROOT_URI}/${PORT}`
      .yellow.bold
  )
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  disconnectDB();
});

process.on("uncaughtException", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
});
