import { Optional } from "@nestjs/common";
import { isArray, IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";


export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string
  
  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  link?: string
}