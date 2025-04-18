import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SongsModule } from './songs/songs.module';
import { AlbumsModule } from './albums/albums.module';
import { ConfigModule } from '@nestjs/config';

// const password = process.env.MONGOPASSWORD
// const mongo_url = process.env.MONGO_URL

// console.log('mongo url: ', process.env.MONGO_PUBLIC_URL)

// const myUrl = ``

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_PUBLIC_URL as string, { dbName: 'godlyProd' }),
    ArtistsModule,
    SongsModule,
    AlbumsModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
