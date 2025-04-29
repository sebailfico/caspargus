import mongoose from "mongoose";

export class MongoServiceBase {
  async connect() {
    mongoose.connection
      .on("open", () => console.log("Connected to Mongoose"))
      .on("close", () => console.log("Disconnected from Mongoose"))
      .on("error", (error) => console.log(error));

    return mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/caspargus"
    );
  }
}
