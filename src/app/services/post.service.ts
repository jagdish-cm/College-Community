import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  posts: Post[];

  addPost(newPost: Post) {
    this.posts.push(newPost);
  }

  sendPosts() {
    return this.posts;
  }

  constructor() {}
}
