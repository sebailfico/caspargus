import mongoose, { Schema, Model } from "mongoose";
import { ICaspargusEventSummary } from "../models/ICaspargusEventSummary";
import { randomUUID } from "crypto";
export class MongoService {
  //   connection = mongoose.connection;
  eventSchema?: Schema;
  eventModel?: Model<ICaspargusEventSummary>;

  async connect() {
    mongoose.connection
      .on("open", () => console.log("Connected to Mongoose"))
      .on("close", () => console.log("Disconnected from Mongoose"))
      .on("error", (error) => console.log(error));

    mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/caspargus"
    );

    this.eventSchema = new mongoose.Schema<ICaspargusEventSummary>({
      _id: { type: String, required: true },
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    this.eventModel = mongoose.model<ICaspargusEventSummary>(
      "EventSummary",
      this.eventSchema
    );
  }

  async getEvents() {
    if (!this.eventModel) {
      throw new Error("MongoService not connected. Call connect() first.");
    }
    const events = await this.eventModel.find();
    return events;
  }

  async createEvent(name: string) {
    if (!this.eventModel) {
      throw new Error("MongoService not connected. Call connect() first.");
    }
    const newEvent: ICaspargusEventSummary = {
      _id: randomUUID(),
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const event = await this.eventModel.create(newEvent);
    return event;
  }
}
