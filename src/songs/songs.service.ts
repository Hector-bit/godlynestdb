import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "src/schemas/Song.schema";
import { CreateSongDto } from "./dto/CreateSong.dto";
import { Artist } from "src/schemas/Artist.schema";

@Injectable()
export class SongsService{
  constructor(
    @InjectModel(Song.name) private songModel:Model<Song>,
    @InjectModel(Artist.name) private artistModel:Model<Artist>
  ){}

  getSongs() {
    return this.songModel.find()
  }

  getSongsByArtistId(id:string) {
    return this.songModel.findById(id)
  }

  async createSong({ ...createSongDto}: CreateSongDto) {
    // just making sure the artist exists first
    const findArtist = await this.artistModel.findById(createSongDto.artistId)
    if(!findArtist) throw new HttpException('artist not found', 404)
    

    const newSong = new this.songModel(createSongDto)
    const savedSong = await newSong.save()

    findArtist.updateOne({ 
      $push: {
        songs: savedSong._id
      }
    })
    return savedSong
  }

  //TODO: add updateSong fn
}

