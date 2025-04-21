import { Module } from '@nestjs/common';
// import { ArtistsController } from './controllers/artists/artists.controller';
import { EventsController } from './events.controller';
import { EventsService } from './event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema, Event } from 'src/schemas/Event.schema';

@Module({
  imports: [
    //this registers mongoose schema
    MongooseModule.forFeature([
      {
        name: Event.name,
        schema: EventSchema
      }
    ])
  ],
  providers: [EventsService],
  controllers: [EventsController]
})

export class EventsModule {}

