import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artist } from "src/schemas/Artist.schema";
import { CreateArtistDto } from "./dto/CreateArtist.dto";
import { UpdateArtistDto } from "./dto/UpdateArtist.dto";


@Injectable()
//allows us to inject the model we want to use
export class ArtistsService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>){}

  createArtist(createArtistDto:CreateArtistDto){
    const newArtist = new this.artistModel(createArtistDto);
    return newArtist.save()
  }

  getArtists() {
    return this.artistModel.find();
  }

  getArtistById(id: string){
    return this.artistModel.findById(id)
  }

  updateArtist(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artistModel.findByIdAndUpdate(id, updateArtistDto, { new: true })
  }

  deleteUser(id: string){
    return this.artistModel.findByIdAndDelete(id)
  }

}

