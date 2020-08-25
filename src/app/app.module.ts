import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { RouterModule, Routes } from '@angular/router';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FeedComponent } from './home/feed/feed.component';
import { EventsComponent } from './home/events/events.component';
import { AnnouncesComponent } from './home/announces/announces.component';
import { CreatePostComponent } from './home/feed/create-post/create-post.component';
import { PostsComponent } from './home/feed/posts/posts.component';
import { StdmatComponent } from './stdmat/stdmat.component';
import { BooksComponent } from './stdmat/books/books.component';
import { NotesComponent } from './stdmat/notes/notes.component';
import { PapersComponent } from './stdmat/papers/papers.component';
import { TutorialsComponent } from './stdmat/tutorials/tutorials.component';

const routes: Routes = [
  // { path: '', component: HomeComponent }
  { path: '', component: StdmatComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FeedComponent,
    EventsComponent,
    AnnouncesComponent,
    CreatePostComponent,
    PostsComponent,
    StdmatComponent,
    BooksComponent,
    NotesComponent,
    PapersComponent,
    TutorialsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    FontAwesomeModule,
    NgbModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
