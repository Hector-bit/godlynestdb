import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Album } from "./Album.schema";
import { Song } from "./Song.schema";

//schema tells mongoose there is a schema
@Schema()
export class Artist {
  @Prop({ required: true })
  name: string

  @Prop({ unique: true })
  artistName?: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Album' })
  albums?: Album[]

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Song' })
  songs?: Song[]
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);



