import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-papers',
  templateUrl: './papers.component.html',
  styleUrls: ['./papers.component.scss']
})
export class PapersComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  list = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 88];
  title: string = 'Trees and Graphs';
  update = Date.now();
  upby: string = 'Binod';
  subject: string = 'Data structures & Algos';
  faSearch = faSearch;
}
