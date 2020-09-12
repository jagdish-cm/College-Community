import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  constructor(
    private postsService: PostService,
    private route: ActivatedRoute
  ) {}

  isLoading: boolean = false;
  posts;
  nposts;

  ngOnInit(): void {
    this.isLoading = true;
    this.nposts = this.route.snapshot.data.posts;
    this.nposts = this.nposts.posts;
    console.log(this.nposts);
    this.posts = this.nposts.sort((a, b) => b.time - a.time);
    this.isLoading = false;
  }
}
