import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @IsNotEmpty()
  @IsString()
  text:String;

  @IsNotEmpty()
  @IsString()
  userId: String;

  parentId:null | string;
}
