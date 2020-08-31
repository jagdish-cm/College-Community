import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.scss']
})
export class TutorialsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  list = [1, 2, 3, 4, 5, 6, 7, 8, 8, 8, 88];
  title: string = 'Trees and Graphs';
  update = Date.now();
  upby: string = 'Binod';
  subject: string = 'Data structures & Algos';

  ytlink: string =
    '//www.youtube.com/embed/K_PQPfDbgHM?wmode=transparent&autoplay=1';
  ytthumb: string = 'https://img.youtube.com/vi/K_PQPfDbgHM/hqdefault.jpg';
}
