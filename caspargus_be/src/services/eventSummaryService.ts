import mongoose, { Schema, Model } from "mongoose";
import { MongoServiceBase } from "./mongoServiceBase";
import { ICaspargusEventSummary } from "../models/ICaspargusEventSummary";
import { randomUUID } from "crypto";

export class EventSummaryService extends MongoServiceBase {
  private schema?: Schema;
  private model?: Model<ICaspargusEventSummary>;

  async initialize() {
    await this.connect();

    this.schema = new Schema<ICaspargusEventSummary>({
      _id: { type: String, required: true },
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
    });

    this.model = mongoose.model<ICaspargusEventSummary>(
      "EventSummary",
      this.schema
    );
    return this;
  }

  async getEventSummaries() {
    if (!this.model) {
      throw new Error(
        "EventSummaryService not initialized. Call initialize() first."
      );
    }
    return await this.model.find();
  }

  async createEventSummary(name: string) {
    if (!this.model) {
      throw new Error(
        "EventSummaryService not initialized. Call initialize() first."
      );
    }
    const newEvent: ICaspargusEventSummary = {
      _id: randomUUID(),
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const event = await this.model.create(newEvent);
    return event;
  }
}
