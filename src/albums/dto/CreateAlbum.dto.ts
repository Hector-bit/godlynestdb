import { isArray, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  artistId: string
  
  @IsNotEmpty()
  @IsString()
  albumName: string

  @IsOptional()
  @IsArray()
  @IsString({ each: true})
  albumSongs?: string[]
}

export class AddSongsToAlbumDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true})
  albumSongs: string[]

  @IsNotEmpty()
  @IsString()
  artistId: string
}