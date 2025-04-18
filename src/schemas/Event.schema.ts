import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Album } from "./Album.schema";
import { Song } from "./Song.schema";

//schema tells mongoose there is a schema
@Schema()
export class Event {
  @Prop({ required: true })
  eventTitle: string

  @Prop({ })
  eventDescription?: string

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  eventLink?: string
}

export const EventSchema = SchemaFactory.createForClass(Event);



