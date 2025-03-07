import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Artist } from "src/schemas/Artist.schema";
import { CreateArtistDto } from "./dto/CreateArtist.dto";


@Injectable()
//allows us to inject the model we want to use
export class ArtistsService {
  constructor(@InjectModel(Artist.name) private artistModel: Model<Artist>){}

  createArtist(createArtistDto:CreateArtistDto){

  }

}

