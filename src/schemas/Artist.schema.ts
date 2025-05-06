import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Album } from "./Album.schema";
import { Song } from "./Song.schema";

//schema tells mongoose there is a schema
@Schema()
export class Artist {
  @Prop({ required: true })
  name?: string

  @Prop()
  artistName?: string

  @Prop({ type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }] })
  albums?: Album[]

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song'}] })
  songs?: Song[]

  @Prop({ unique: false })
  img?: string
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);



