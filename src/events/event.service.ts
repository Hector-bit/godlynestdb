import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "src/schemas/Song.schema";
import { Event } from "src/schemas/Event.schema";
import { CreateEventDto } from "./dto/createEventDto";
import { PatchEventDto } from "./dto/patchEvent.dto";

@Injectable()
export class EventsService{
  constructor(
    @InjectModel(Event.name) private eventModel:Model<Song>,
  ){}
  // --------------> GET REQUESTS FOR EVENTS <--------------
  async getEvent(eventId: string) {
    return this.eventModel.findById(eventId);
  }

  async getEvents() {
    return this.eventModel.find();
  }

  // --------------> POST REQUESTS FOR EVENTS <--------------
  async createEvent(createEventDto: CreateEventDto){
    const newEvent = new this.eventModel(createEventDto)
    return newEvent.save()
  }

  // --------------> PATHC REQUESTS FOR EVENTS <--------------
  async patchEvent(eventId: string, patchEventDto: PatchEventDto){
    const patchedEvent = this.eventModel.findByIdAndUpdate(
      eventId,
      { $set: patchEventDto }, 
      { new: true }
    )

    return patchedEvent
  }

  // --------------> DELETE REQUESTS FOR EVENTS <--------------
  async deleteEvent(eventId: string){
    const deletedEvent = await this.eventModel.findByIdAndDelete(eventId)
    return deletedEvent
  }
}

