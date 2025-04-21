import { IsNotEmpty, IsOptional, IsString } from "class-validator";


export class UpdateSongDto {
  @IsNotEmpty()
  songId: string

  @IsString()
  songName: string

  @IsString()
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

