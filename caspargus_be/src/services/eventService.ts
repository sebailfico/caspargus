import mongoose, { Schema, Model } from "mongoose";
import { MongoServiceBase } from "./mongoServiceBase";
import { randomUUID } from "crypto";
import {
  ICaspargusEvent,
  ICaspargusEventSummary,
} from "../models/ICaspargusEventSummary";

export class EventService extends MongoServiceBase {
  private schema?: Schema;
  private model?: Model<ICaspargusEvent>;

  async initialize() {
    await this.connect();

    this.schema = new Schema<ICaspargusEvent>({
      _id: { type: String, required: true },
      name: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      // description: { type: String },
      // startDate: { type: Date },
      // endDate: { type: Date },
      // location: { type: String },
      // image: { type: String },
      graphics: [
        {
          name: { type: String, required: true },
          config: { type: Map, of: String },
        },
      ],
    });

    this.model = mongoose.model<ICaspargusEvent>("Event", this.schema);

    return this;
  }

  async getEvents() {
    if (!this.model) {
      throw new Error("EventService not initialized. Call initialize() first.");
    }
    const events = await this.model.find();
    return events;
  }

  async getEventById(id: string) {
    if (!this.model) {
      throw new Error("EventService not initialized. Call initialize() first.");
    }
    const event = await this.model.findById(id);
    return event;
  }

  async createEvent(event: ICaspargusEventSummary) {
    if (!this.model) {
      throw new Error("EventService not initialized. Call initialize() first.");
    }
    const newEvent: ICaspargusEvent = {
      _id: event._id,
      name: event.name,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      graphics: [],
    };
    const createdEvent = await this.model.create(newEvent);
    return createdEvent;
  }

  async updateEvent(id: string, event: Partial<ICaspargusEvent>) {
    if (!this.model) {
      throw new Error("EventService not initialized. Call initialize() first.");
    }
    const updatedEvent = await this.model.findByIdAndUpdate(
      id,
      { ...event, updatedAt: new Date() },
      { new: true }
    );
    return updatedEvent;
  }

  async deleteEvent(id: string) {
    if (!this.model) {
      throw new Error("EventService not initialized. Call initialize() first.");
    }
    await this.model.findByIdAndDelete(id);
  }
}
