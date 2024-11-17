import { Post } from '@prisma/client';
import { IsObject, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Username must be a string' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  name: string;

  @IsObject({
    message: 'Profile must be an object',
  })
  posts: Post[];
}
