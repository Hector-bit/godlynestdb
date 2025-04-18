import { Get, Post, Delete, Patch, Param, Body } from "@nestjs/common";
import { Controller } from "@nestjs/common";
import { AlbumsService } from "./albums.service";
import { AddSongsToAlbumDto, CreateAlbumDto } from "./dto/CreateAlbum.dto";


@Controller('albums')
export class AlbumsController {
  constructor(private albumsService: AlbumsService){}

  @Get()
  getAlbums(){
    return this.albumsService.getAlbums()
  }

  @Get(':id')
  async getAlbumByAlbumId(
    @Param('id') id: string
  ){
    const album = await this.albumsService.getAlbumsByAlbumId(id)
    // console.log('MY ALBUM: ', album)
    return album[0]
  }

  @Post()
  createAlbums(
    @Body() createAlbumDto: CreateAlbumDto
  ){
    return this.albumsService.createAlbum({ ...createAlbumDto })
  }

  @Post(':id')
  async addSongsToAlbum(
    @Param('id') id: string,
    @Body() addSongToAlbumDto: AddSongsToAlbumDto
  ){
    // this.albumsService.addSongsToAlbum
    
    return 'this is to add songs to albums'
  }

  @Patch(':id')
  async patchAlbum(
    @Param('id') id: string
  ){
    return 'this patches an album'
  }

  @Delete(':id')
  async deleteAlbum(@Param('id') id:string){
    return this.albumsService.deleteAlbum(id)
  }
}


