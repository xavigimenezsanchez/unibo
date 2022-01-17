import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { HttpModuleOptions, HttpModule } from '@nestjs/axios';
import * as https from 'https';

const httpModuleOption: HttpModuleOptions = {
 
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })

};

@Module({
  imports: [
    HttpModule.register(httpModuleOption)
  ],  
  controllers: [PostController],
  providers: [PostService]
})
export class PostModule {}
