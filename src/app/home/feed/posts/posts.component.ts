import { Component, OnInit } from '@angular/core';
import { Post } from '../../../models/post.model';
import { PostService } from '../../../services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(private postsService: PostService) {}

  posts: Post[];
  private postsSub: Subscription;

  ngOnInit(): void {
    this.postsService.getPosts();
    this.postsSub = this.postsService
      .getPostsUpdateListener()
      .subscribe((oposts: Post[]) => {
        this.posts = oposts;
      });
  }
}
