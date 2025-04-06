import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  songName: string

  @IsString()
  @IsNotEmpty()
  artistId: string;

  @IsString()
  @IsOptional()
  albumId?: string;

  @IsString()
  @IsOptional()
  spotifyLink?: string;

  @IsString()
  @IsOptional()
  youtubeLink?: string;

  @IsString()
  @IsOptional()
  soundCloudLink?: string;
}

