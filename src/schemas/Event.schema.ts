import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Album } from "./Album.schema";
import { Song } from "./Song.schema";

//schema tells mongoose there is a schema
@Schema()
export class Event {
  @Prop({ required: true })
  title: string

  @Prop()
  description?: string

  @Prop()
  link?: string

  @Prop()
  imgLink?: string
}

export const EventSchema = SchemaFactory.createForClass(Event);



