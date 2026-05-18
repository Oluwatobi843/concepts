import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  // Get all Data
  @Get()
  findAll(@Query('search') search?: string): PostInterface[] {
    const extractAllPosts = this.postsService.findAll()

    if(search){
      return extractAllPosts.filter(singlePost => singlePost.title.toLowerCase().includes(search.toLowerCase()) );
    }

    return extractAllPosts
  }


  // Get a single Data
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id : number) : PostInterface{
    return this.postsService.findOne(id)
  }


  // Create Post
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPostData: CreatePostDto) : PostInterface{
    return this.postsService.create(createPostData)
  }

  // create Put for update
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number,
  @Body() updatePostData: Partial<Omit<PostInterface, 'id' | 'createdAt'>> ): PostInterface {
    return this.postsService.update(id, updatePostData);
} 

// Delete for remove
@Delete(':id')
@HttpCode(HttpStatus.NO_CONTENT)
remove(@Param ('id', ParseIntPipe) id: number ) : void{
  this.postsService.remove(id)
}

}
