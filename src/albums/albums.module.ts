import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Song, SongSchema } from 'src/schemas/Song.schema';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './albums.service';
import { Artist, ArtistSchema } from 'src/schemas/Artist.schema';
import { Album, AlbumSchema } from 'src/schemas/Album.schema';
import { ArtistsService } from 'src/artists/artist.service';


@Module({
  imports: [
    //this registers mongoose schema
    MongooseModule.forFeature([
      {
        name: Album.name,
        schema: AlbumSchema
      },
      {
        name: Artist.name,
        schema: ArtistSchema
      }
    ])
  ],
  providers: [AlbumsService],
  controllers: [AlbumsController]
})

export class AlbumsModule {}
