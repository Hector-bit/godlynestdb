import { Body, Controller, Param, Post, Get, Delete, UsePipes, ValidationPipe, HttpException, Patch } from '@nestjs/common';
import { ArtistsService } from 'src/artists/artist.service';
import { CreateArtistDto } from 'src/artists/dto/CreateArtist.dto';
import mongoose from 'mongoose';
import { UpdateArtistDto } from 'src/artists/dto/UpdateArtist.dto';

//controller arg is routename i think
@Controller('artists')
export class ArtistsController {

  constructor(private artistsService: ArtistsService){}

  // GET ALL ARTISTS
  @Get()
  async getUsers(){
    let artists = await this.artistsService.getArtists();
    // console.log('my artists: ', artists)
    return artists
  }

  // GET SINGLE ARTIST
  @Get(':id')
  async getArtistById(@Param('id') id:string){
    mongoose.Types.ObjectId.isValid(id)
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException('user not found', 404)

    const findArtist = await this.artistsService.getArtistById(id);
    if(!findArtist) throw new HttpException('User not found', 404)
    
    return findArtist
  }

  // CREATE ARTIST
  @Post()
  @UsePipes(new ValidationPipe())
  createArtist(@Body() createArtistDto: CreateArtistDto) {
    // console.log('my artist dto: ', createArtistDto)
    return this.artistsService.createArtist(createArtistDto);
  }

  // PATCH ARTIST
  @Patch(':id')
  @UsePipes(new ValidationPipe())
  async updateArtist(
    @Param('id') id:string, 
    @Body() UpdateArtistDto:UpdateArtistDto
  ){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException('Invalid id', 400)
    const updatedArtist = await this.artistsService.updateArtist(id, UpdateArtistDto)
    if(!updatedArtist) throw new HttpException('User not found', 404)
    return updatedArtist
  }

  // DELETE ARTIST
  @Delete(':id')
  async deleteUser(@Param('id') id: string){
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) throw new HttpException('Invalid id', 400)
    const deleteUser = await this.artistsService.deleteArtist(id)
    if(!deleteUser) throw new HttpException('User not found', 404)
    return 'DELETED ARTIST';
  }
}
