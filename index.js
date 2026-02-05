const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
const { RedisStore } = require("connect-redis");

const {
  MONGO_IP,
  MONGO_PORT,
  MONGO_USER,
  MONGO_PASSWORD,
  REDIS_URL,
  REDIS_PORT,
  SESSION_SECRET,
} = require("./config/config");

const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/authRoutes");

// Redis client (NEW WAY)
let redisClient = redis.createClient({
  url: `redis://${REDIS_URL}:${REDIS_PORT}`,
});

redisClient
  .connect()
  .then(() => console.log("Redis connected"))
  .catch((err) => console.log("Redis error", err));

// Mongo connection
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Mongo error", err));

app.enable("trust proxy");
// Session config
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 600000,
    },
  }),
);

app.use(express.json());
app.get("/api/v1", (req, res) => {
  res.send("<h2>Hello World</h2>");
  console.log("Yeah it ran");
  
});
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/users", userRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
