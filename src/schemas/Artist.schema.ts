import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

//schema tells mongoose there is a schema
@Schema()
export class Artist {
  @Prop({ required: true })
  name: string

  @Prop({ unique: true, required: true })
  artistName: string
}

export const ArtistSchema = SchemaFactory.createForClass(Artist);



