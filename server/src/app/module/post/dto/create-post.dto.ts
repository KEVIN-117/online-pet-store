import { IsBoolean, IsString } from 'class-validator';

export class CreatePostDto {
  @IsString({ message: 'Title must be a string' })
  title: string;

  @IsString({ message: 'Content must be a string' })
  content: string;

  @IsBoolean({
    message: 'Published must be a boolean',
  })
  published: boolean;

  @IsString({
    message: 'Author must be a string',
  })
  author: string;
}
