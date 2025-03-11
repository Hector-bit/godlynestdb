import { Controller, Post, Get, Delete, Body, UsePipes, ValidationPipe, Param } from "@nestjs/common";
import { CreateSongDto } from "./dto/CreateSong.dto";
import { SongsService } from "./songs.service";
import mongoose from "mongoose";

@Controller('songs')
export class SongsController {
  constructor(private songsService: SongsService){}

  @Get()
  findSongs(){
    return this.songsService.getSongs();
  }

  // artist id for param
  @Get(':id')
  async getSongsById(
    @Param('id') id: string
  ){
    return this.songsService.getSongsByArtistId(id)
  }

  // artist id for param
  @Post(':id')
  @UsePipes(new ValidationPipe())
  createSong(
    @Param('id') id:string,
    @Body() createSongDto: CreateSongDto
  ){
    console.log('new song being added: ', createSongDto)
    return this.songsService.createSong(createSongDto)
  }
}
