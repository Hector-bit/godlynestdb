import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Song } from "src/schemas/Song.schema";
import { CreateSongDto } from "./dto/CreateSong.dto";
import { Artist } from "src/schemas/Artist.schema";
import { Album } from "src/schemas/Album.schema";
import { UpdateSongDto } from "./dto/UpdateSong.dto";

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

    // console.log('get songs filter body', filterBody)

    return this.songModel.find(filterBody)
  }

  // --------------> GET REQUESTS FOR SONGS <--------------

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

  
  // --------------> POST REQUESTS FOR SONGS <--------------

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

  
  // --------------> PATCH REQUESTS FOR SONGS <--------------
  async updateSong( { songId, ...updateSongDto }: UpdateSongDto ){
    const findSong = await this.songModel.findByIdAndUpdate(
      songId, 
      { $set: updateSongDto }, 
      { new: true }
    )

    console.log('found soung: ', findSong)

    console.log('dto updates with: ', updateSongDto)

    // song not found error
    if(!findSong){
      throw new Error("Song not found")
    }
    // if (createSongDto.songName) findSong.songName = createSongDto.songName;
    // if (createSongDto.artistId) findSong.artistId = createSongDto.artistId;
    // if (createSongDto.albumId) findSong.albumId = createSongDto.albumId;
    // if (createSongDto.spotifyLink) findSong.spotifyLink = createSongDto.spotifyLink;
    // if (createSongDto.youtubeLink) findSong.youtubeLink = createSongDto.youtubeLink;
    // if (createSongDto.soundCloudLink) findSong.soundCloudLink = createSongDto.soundCloudLink;

    return findSong
  }
  
  // --------------> DELETE REQUESTS FOR SONGS <--------------
  async deleteSong( songId: string ) {  
    await this.songModel.findByIdAndDelete(songId)
  }
}

