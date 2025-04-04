import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Album } from "src/schemas/Album.schema";
import { AddSongsToAlbumDto, CreateAlbumDto } from "./dto/CreateAlbum.dto";
import { CreateSongDto } from "src/songs/dto/CreateSong.dto";
import { Artist } from "src/schemas/Artist.schema";


@Injectable()
export class AlbumsService{
  constructor(
    @InjectModel(Album.name) private albumModel:Model<Album>,
    @InjectModel(Artist.name) private artistModel:Model<Artist>
  ){}

  getAlbums(){
    return this.albumModel.find()
  }

  async getAlbumsByArtistId(artistId: string){
    return this.albumModel.find({ artistId: artistId })
  }

  async createAlbum({ artistId, ...createAlbumDto }: CreateAlbumDto){
    //step one find user
    const findArtist = await this.artistModel.findById(artistId)
    if(!findArtist) throw new HttpException('artist not found', 404)

    //step two create and save album
    const newAlbum = new this.albumModel({...createAlbumDto, artistId: artistId})
    const savedAlbum = await newAlbum.save()

    //step three update artist albums by adding newly created album
    await findArtist.updateOne({ 
      $push: {
        albums: savedAlbum._id
      }
    })

    // alternative that uses the findByIdAndUpdate instead of updateOne, but the orginal issue is that I wasn't awaiting the findArtist.updateOne 
    // so thats why it wasn't adding the newly created album to the artist instance
    // await this.artistModel.findByIdAndUpdate(artistId, {
    //   $push: { albums: savedAlbum._id }
    // });

    return savedAlbum;
  }

  // async addSongsToAlbum({ ...addSongsToAlbumDto }: AddSongsToAlbumDto){
  //   const 
  // }
}


