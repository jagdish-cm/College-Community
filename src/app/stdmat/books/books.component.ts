import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  list = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 88];
  title: string = 'Trees and Graphs';
  update = Date.now();
  upby: string = 'Binod';
  subject: string = 'Data structures & Algos';
}
