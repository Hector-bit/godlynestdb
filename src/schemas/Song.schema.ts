import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

@Schema()
export class Song {
  @Prop({ required: true })
  songName: string

  @Prop({ type: mongoose.Types.ObjectId, ref: "Artist", required: true })
  artistId: string

  @Prop({ type: mongoose.Types.ObjectId, ref: 'Album', required: false})
  albumId?: string
}

export const SongSchema = SchemaFactory.createForClass(Song)


