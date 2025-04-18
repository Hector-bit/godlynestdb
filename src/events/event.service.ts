import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "src/schemas/Song.schema";
// import { CreateSongDto } from "./dto/CreateSong.dto";
import { Artist } from "src/schemas/Artist.schema";
import { Album } from "src/schemas/Album.schema";
import { Event } from "src/schemas/Event.schema";

@Injectable()
export class EventsService{
  constructor(
    @InjectModel(Event.name) private eventModel:Model<Song>,
  ){}

  async getEvents( ) {
    return 'none ahhhh events'
  }
}

