import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Album } from "src/schemas/Album.schema";
import { CreateAlbumDto } from "./dto/CreateAlbum.dto";
import { CreateSongDto } from "src/songs/dto/CreateSong.dto";


@Injectable()
export class AlbumsService{
  constructor(
    @InjectModel(Album.name) private albumModel:Model<Album>
  ){}

  getAlbums(){
    return this.albumModel.find()
  }

  async createAlbum({ ...createAlbumDto }: CreateAlbumDto){
    const newAlbum = new this.albumModel(createAlbumDto)
    const saveAlbum = await newAlbum.save()

    return saveAlbum
  }
}


