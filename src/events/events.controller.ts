import { Body, Controller, Param, Post, Get, Delete, Patch } from '@nestjs/common';
import { CreateEventDto } from './dto/createEventDto';
import { EventsService } from './event.service';
import { PatchEventDto } from './dto/patchEvent.dto';

//controller arg is routename i think
@Controller('events')
export class EventsController {

  constructor(private eventsService: EventsService){}

  // --------------> GET REQUESTS FOR EVENTS <--------------
  @Get(':id')
  async getEvent(
    @Param('id') eventId: string
  ){
    return this.eventsService.getEvent(eventId)
  }

  @Get()
  async getEvents(){
    return this.eventsService.getEvents()
  }

  // --------------> POST REQUESTS FOR EVENTS <--------------
  @Post()
  async createEvent(
    @Body() createEventDto: CreateEventDto
  ){
    return this.eventsService.createEvent(createEventDto)
  }

  // --------------> PATCH REQUESTS FOR EVENTS <--------------
  @Patch(':id')
  async patchEvent(
    @Param('id') eventId: string,
    @Body() patchEventDto: PatchEventDto
  ){
    return this.eventsService.patchEvent(eventId, patchEventDto)
  }
  
  // --------------> DELETE REQUESTS FOR EVENTS <--------------
  @Delete(':id')
  async deleteEvent(
    @Param('id') eventId: string 
  ){
    const deletedEvent = this.eventsService.deleteEvent(eventId)

    return deletedEvent
  }
}
