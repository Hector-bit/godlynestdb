import { Controller, Post, Get, Delete, Body, UsePipes, ValidationPipe, Param, Query } from "@nestjs/common";
import { CreateSongDto } from "./dto/CreateSong.dto";
import { SongsService } from "./songs.service";
import mongoose from "mongoose";

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService){}

  @Get()
  findSongs(@Query() query: { albumId: string, artistId: string, isSingle: boolean }){

    // if(query && query.isSingle){
    //   return this.songsService.getSingles(query);
    // }
    if(query){
      return this.songsService.getSongs(query);
    }

    return this.songsService.getSongs();
  }

  // song id for param for del, put, etc.
  @Get(':id')
  async getSongsById(
    @Param('id') id: string
  ){
    return this.songsService.getSongBySongId(id)
  }

  // artist id for param
  @Post()
  @UsePipes(new ValidationPipe())
  createSong(
    // @Param('id') id:string,
    @Body() createSongDto: CreateSongDto
  ){
    console.log('new song being added: ', createSongDto)
    return this.songsService.createSong(createSongDto)
  }
}
