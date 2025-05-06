import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artist } from "src/schemas/Artist.schema";
import { CreateArtistDto } from "./dto/CreateArtist.dto";
import { UpdateArtistDto } from "./dto/UpdateArtist.dto";
import { Album } from "src/schemas/Album.schema";
import { Song } from "src/schemas/Song.schema";


@Injectable()
//allows us to inject the model we want to use
export class ArtistsService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    @InjectModel(Album.name) private albumModel: Model<Album>,
    @InjectModel(Song.name) private songModel: Model<Song>
  ){}

  // --------------> GET REQUESTS FOR ARTISTS <--------------
  getArtists() {
    return this.artistModel.find();
  }

  getArtistById(id: string){
    return this.artistModel.findById(id).populate('albums')
  }
  
  // --------------> POST REQUESTS FOR ARTISTS <--------------
  
  createArtist(createArtistDto:CreateArtistDto){
    const newArtist = new this.artistModel(createArtistDto);
    return newArtist.save()
  }
  // --------------> PATCH REQUESTS FOR ARTISTS <--------------

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    console.log('updating: ', id, updateArtistDto)
    return this.artistModel.findByIdAndUpdate(
      id,
      updateArtistDto, 
      { new: true }
    )
  }

    // --------------> DELETE REQUESTS FOR ARTISTS <--------------

  async deleteArtist(id: string){
    await this.albumModel.deleteMany({ artistId: id })
    await this.songModel.deleteMany({ artistId: id })
    const deletedArtist = await this.artistModel.findByIdAndDelete(id)
    return deletedArtist
  }

}

