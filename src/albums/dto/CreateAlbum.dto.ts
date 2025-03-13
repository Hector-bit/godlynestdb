import { isArray, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  albumName: string

  @IsNotEmpty()
  @IsString()
  artistId: string

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