import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractAllPosts = this.postsService.findAll()

    if(search){
      return extractAllPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search.toLowerCase()) );
    }

    return extractAllPosts
  }


  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id : number) : PostInterface{
    return this.postsService.findOne(id)
  }
}
