import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "src/schemas/Song.schema";
import { CreateSongDto } from "./dto/CreateSong.dto";
import { Artist } from "src/schemas/Artist.schema";
import { Album } from "src/schemas/Album.schema";

@Injectable()
export class SongsService{
  constructor(
    @InjectModel(Song.name) private songModel:Model<Song>,
    @InjectModel(Artist.name) private artistModel:Model<Artist>,
    @InjectModel(Album.name) private albumModel:Model<Album>
  ){}

  async getSongs( query?: { artistId?: string, albumId?: string, isSingle?: boolean }) {
    const filterBody: any = {}
    if(query && query.artistId){ filterBody.artistId = query.artistId}
    if(query && query.albumId){ filterBody.albumId = query.albumId}

    if(query && !query.albumId && query.isSingle){ filterBody.albumId = { $exists: false } }

    console.log('get songs filter body', filterBody)

    return this.songModel.find(filterBody)
  }

  async getSingles( query?: { artistId: string, isSingle: boolean }) {
    const filterBody: any = { artistId: query?.artistId, albumId: { $exists: false } }
    // if(query && query.artistId !== ''){ filterBody.artistId = query.artistId}
    // if(query && query.albumId !== ''){ filterBody.albumId = query.albumId}
    // if(query && query.isSingle){ filterBody.albumId = { $exists: false } }

    console.log('get singles filter body', filterBody)

    return this.songModel.find(filterBody)
  }


  getSongBySongId(id:string) {
    return this.songModel.findById(id)
  }

  async createSong({ ...createSongDto }: CreateSongDto) {
    // just making sure the artist exists first
    const findArtist = await this.artistModel.findById(createSongDto.artistId)
    if(!findArtist) throw new HttpException('artist not found', 404)    

    const newSong = new this.songModel(createSongDto)
    const savedSong = await newSong.save()

    //if album is passed then get that too
    // let findAlbum:any = undefined
    if(createSongDto?.albumId){
      const findAlbum = await this.albumModel.findById(createSongDto.albumId)
      await findAlbum?.updateOne({
        $push: {
          albumSongs: savedSong._id
        }
      })
    }

    await findArtist.updateOne({ 
      $push: {
        songs: savedSong._id
      }
    })

    return savedSong
  }
  async deleteSong( songId: string ) {

  }
}

