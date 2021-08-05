import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from '../../../services/post.service';
import { MessageService } from 'primeng/api';
// import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [MessageService],
})
export class PostsComponent implements OnInit {
  isLoading: boolean = false;
  posts;
  nposts;
  isDataLoaded: boolean = false;
  curUser;

  constructor(
    private messageService: MessageService,
    private postsService: PostService,
    private authService: AuthService // private route: ActivatedRoute
  ) {
    this.postsService.getPosts().subscribe((result) => {
      this.posts = result.posts;
      this.posts = this.posts.sort((a, b) => b.time - a.time);
      this.isDataLoaded = true;
    });
  }

  ngOnInit(): void {
    if (this.authService.isLogged()) {
      this.curUser = this.authService.getCurUser();
    }

    this.authService.distributeCurUserInfo().subscribe((result) => {
      this.curUser = result;
    });
  }
}
