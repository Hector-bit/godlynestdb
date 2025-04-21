import { Body, Controller, Param, Post, Get, Delete, UsePipes, ValidationPipe, HttpException, Patch } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artist.service';
import { CreateArtistDto } from 'src/artists/dto/CreateArtist.dto';
import mongoose from 'mongoose';
import { UpdateArtistDto } from 'src/artists/dto/UpdateArtist.dto';
import { CreateEventDto } from './dto/createEventDto';
import { EventsService } from './event.service';

//controller arg is routename i think
@Controller('events')
export class EventsController {

  constructor(private eventsService: EventsService){}

  // --------------> GET REQUESTS FOR EVENTS <--------------
  @Get()
  async getEvents(){
    // let artists = await this.artistsService.getArtists();
    // // console.log('my artists: ', artists)
    // return artists
    return this.eventsService.getEvents()
  }

  // --------------> POST REQUESTS FOR EVENTS <--------------
  @Post()
  async createEvent(
    @Body() createEventDto: CreateEventDto
  ){
    return this.eventsService.createEvent(createEventDto)
  }

  // --------------> PUT REQUESTS FOR EVENTS <--------------
  // --------------> DELETE REQUESTS FOR EVENTS <--------------
  @Delete(':id')
  async deleteEvent(
    @Param('id') eventId: string 
  ){
    const deletedEvent = this.eventsService.deleteEvent(eventId)

    return deletedEvent
  }
}
