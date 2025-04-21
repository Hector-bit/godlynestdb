import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "src/schemas/Song.schema";
import { Event } from "src/schemas/Event.schema";
import { CreateEventDto } from "./dto/createEventDto";
import { error } from "console";

@Injectable()
export class EventsService{
  constructor(
    @InjectModel(Event.name) private eventModel:Model<Song>,
  ){}
  // --------------> GET REQUESTS FOR EVENTS <--------------
  async getEvents() {
    return this.eventModel.find();
  }

  // --------------> POST REQUESTS FOR EVENTS <--------------
  async createEvent(createEventDto: CreateEventDto){
    const newEvent = new this.eventModel(createEventDto)
    return newEvent.save()
  }

  // --------------> DELETE REQUESTS FOR EVENTS <--------------
  async deleteEvent(eventId: string){
    const deletedEvent = await this.eventModel.findByIdAndDelete(eventId)
    return deletedEvent
  }
}

