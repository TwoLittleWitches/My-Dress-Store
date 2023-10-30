const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://*sh*****:************@cluster0.uha3lbe.mongodb.net/DressStore?retryWrites=true&w=majority" ||
    process.env.MONGO_HOST ||
    +(process.env.IP || "localhost") +
      ":" +
      (process.env.MONGO_PORT || "27017") +
      "/mernproject",
};
export default config;
