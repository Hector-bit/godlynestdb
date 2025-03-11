import { IsNotEmpty, IsString } from "class-validator";


export class CreateAlbumDto {
  @IsNotEmpty()
  @IsString()
  albumName: string

  @IsNotEmpty()
  @IsString()
  artistId: string
}

