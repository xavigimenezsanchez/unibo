import { Injectable } from '@nestjs/common';
import { HttpService  } from '@nestjs/axios';
import { AxiosResponse } from "axios";
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';
import { map, mergeMap, Observable, of } from 'rxjs';


const URL = 'https://jsonplaceholder.typicode.com';

@Injectable()
export class PostService {
  constructor(private httpService: HttpService) {}

  create(createPostDto: CreatePostDto): Observable<AxiosResponse<Post>> {
    return this.httpService.post(`${URL}/posts`,createPostDto).pipe(map((resp) => resp.data));
  }

  findAll(): Observable<AxiosResponse<Post[]>> {
    return this.httpService.get(`${URL}/posts`).pipe(map((resp) => resp.data));
  }

  findOne(id: number): Observable<AxiosResponse<Post>> {
    return this.httpService.get(`${URL}/posts/${id}`)
      .pipe(mergeMap(post=> this.httpService.get(`${URL}/users/${post.data.userId}`)
        .pipe(mergeMap(user => this.httpService.get(`${URL}/posts/${id}/comments`)
          .pipe(mergeMap(comments=> {
              return of({...post.data, 'user': user.data, 'comments': comments.data} as any)}))))))
      }

  update(id: number, updatePostDto: UpdatePostDto): Observable<AxiosResponse<Post>> {
    return this.httpService.put(`${URL}/posts/${id}`,updatePostDto).pipe(map((resp) => resp.data));
  }

  remove(id: number) {
    return this.httpService.delete(`${URL}/posts/${id}`).pipe(map((resp) => resp.data));
  }
}
