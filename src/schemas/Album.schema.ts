import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Song } from "./Song.schema";
import mongoose from "mongoose";

//schema tells mongoose there is a schema
@Schema()
export class Album {
  @Prop({ required: true })
  albumName: string

  @Prop({ required: true})
  artistId: string
  //string of id's right?
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }]})
  albumSongs?: Song[]

}

export const AlbumSchema = SchemaFactory.createForClass(Album);



