import { Module } from '@nestjs/common';
import { ArtistsController } from './controllers/artists/artists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Artist, ArtistSchema } from 'src/schemas/Artist.schema';
import { ArtistsService } from './artist.service';
import { Album, AlbumSchema } from 'src/schemas/Album.schema';

@Module({
  imports: [
    //this registers mongoose schema
    MongooseModule.forFeature([
      {
        name: Artist.name,
        schema: ArtistSchema
      },
      {
        name: Album.name,
        schema: AlbumSchema
      }
    ])
  ],
  providers: [ArtistsService],
  controllers: [ArtistsController]
})

export class ArtistsModule {}

