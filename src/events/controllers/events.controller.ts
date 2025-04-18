import { Body, Controller, Param, Post, Get, Delete, UsePipes, ValidationPipe, HttpException, Patch } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artist.service';
import { CreateArtistDto } from 'src/artists/dto/CreateArtist.dto';
import mongoose from 'mongoose';
import { UpdateArtistDto } from 'src/artists/dto/UpdateArtist.dto';

//controller arg is routename i think
@Controller('events')
export class EventsController {

  constructor(private eventsService: ArtistsService){}

  // GET ALL ARTISTS
  @Get()
  async getEvents(){
    // let artists = await this.artistsService.getArtists();
    // // console.log('my artists: ', artists)
    // return artists
    return ['events']
  }
}
