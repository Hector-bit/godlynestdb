import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artist } from "src/schemas/Artist.schema";
import { CreateArtistDto } from "./dto/CreateArtist.dto";
import { UpdateArtistDto } from "./dto/UpdateArtist.dto";
import { Album } from "src/schemas/Album.schema";


@Injectable()
//allows us to inject the model we want to use
export class ArtistsService {
  constructor(
    @InjectModel(Artist.name) private artistModel: Model<Artist>,
    // @InjectModel(Album.name) private albumModel: Model<Album>
  ){}

  createArtist(createArtistDto:CreateArtistDto){
    const newArtist = new this.artistModel(createArtistDto);
    return newArtist.save()
  }

  getArtists() {
    return this.artistModel.find();
  }

  getArtistById(id: string){
    return this.artistModel.findById(id).populate('albums')
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto, { new: true })
  }

  deleteUser(id: string){
    return this.artistModel.findByIdAndDelete(id)
  }

}

