import { IsNotEmpty, IsString } from "class-validator";


export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  songName: string

  @IsString()
  @IsNotEmpty()
  artistId: string;

  @IsString()
  albumId: string;
}

