import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from 'src/schemas/Song.schema';
import { SongsController } from './songs.controller';
import { SongsService } from './songs.service';
import { Artist, ArtistSchema } from 'src/schemas/Artist.schema';


@Module({
  imports: [
    //this registers mongoose schema
    MongooseModule.forFeature([
      {
        name: Song.name,
        schema: SongSchema
      },
      {
        name: Artist.name,
        schema: ArtistSchema
      }
    ])
  ],
  providers: [SongsService],
  controllers: [SongsController]
})
export class SongsModule {}
