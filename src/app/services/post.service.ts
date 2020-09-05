import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  private posts: Post[];
  private postsUpdated = new Subject<Post[]>();

  addPost(
    id: string,
    username: string,
    time: string,
    postContent: string,
    designation: string,
    profileimg: string,
    lcounts: number,
    comcounts: number
  ) {
    const newPost: Post = {
      id: null,
      username: username,
      time: time,
      postContent: postContent,
      designation: designation,
      profileimg: profileimg,
      lcounts: lcounts,
      comcounts: comcounts
    };
    this.http
      .post<{ postid: string }>('http://localhost:3000/api/posts', newPost)
      .subscribe(resdata => {
        console.log(resdata.postid);
        newPost.id = resdata.postid;
        console.log(newPost);
        this.posts.push(newPost);
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostsUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(postid: string) {
    return { ...this.posts.find(p => p.id === postid) };
  }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map(postData => {
          return postData.posts.map(post => {
            return {
              id: post._id,
              username: post.username,
              designation: post.designation,
              time: post.time,
              lcounts: post.lcounts,
              postContent: post.postContent,
              //   comments: Comment[],
              comcounts: post.comcounts,
              profileimg: post.profileimg
            };
          });
        })
      )
      .subscribe(trnasformedPosts => {
        this.posts = trnasformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(
    id: string,
    username: string,
    time: string,
    postContent: string,
    designation: string,
    profileimg: string,
    lcounts: number,
    comcounts: number
  ) {
    const post: Post = {
      id: id,
      username: username,
      time: time,
      postContent: postContent,
      designation: designation,
      profileimg: profileimg,
      lcounts: lcounts,
      comcounts: comcounts
    };
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(() => {
        const updatedPosts = [...this.posts];
        const updateIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[updateIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
