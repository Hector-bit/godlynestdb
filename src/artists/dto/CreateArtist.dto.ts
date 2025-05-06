import { IsNotEmpty, IsString } from "class-validator"


export class CreateArtistDto {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsString()
  artistName?: string

  @IsString()
  img?: string
}


