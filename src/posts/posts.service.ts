import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './interfaces/post.interface';

@Injectable()
export class PostsService {

  private posts : Post [] = [
    {
      id: 1,
      title: 'First',
      content: 'First Post Content',
      authorName: 'Tobi',
      createdAt: new Date()
    }
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: number): Post{
      const singlePost = this.posts.find(( post) => post.id === id);

      if(!singlePost){
        throw new NotFoundException(`Post with ID ${id} is not found`)
      }

      return singlePost
   }
}
