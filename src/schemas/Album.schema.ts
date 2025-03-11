import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

//schema tells mongoose there is a schema
@Schema()
export class Album {
  @Prop({ required: true })
  albumName: string
  artistId: string
  //string of id's right?
  albumSongs?: string[]

}

export const AlbumSchema = SchemaFactory.createForClass(Album);



