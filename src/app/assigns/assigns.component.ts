import { Component, OnInit } from '@angular/core';

import {
  NzTableFilterFn,
  NzTableFilterList,
  NzTableSortFn,
  NzTableSortOrder
} from 'ng-zorro-antd/table';

interface DataItem {
  title: string;
  subject: string;
  dateasgn: number;
  datesub: number;
}

@Component({
  selector: 'app-assigns',
  templateUrl: './assigns.component.html',
  styleUrls: ['./assigns.component.scss']
})
export class AssignsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  listOfColumn = [
    {
      name: 'Title'
      // sortOrder: null,
      // sortFn: (a: DataItem, b: DataItem) => a.title.localeCompare(b.title),
      // listOfFilter: [
      //   { text: 'Joe', value: 'Joe' },
      //   { text: 'Jim', value: 'Jim' }
      // ],
      // filterFn: (list: string[], item: DataItem) =>
      //   list.some(name => item.name.indexOf(name) !== -1)
    },
    {
      name: 'Subject'
      // sortOrder: null
    },
    {
      name: 'Date Assigned',
      compare: (a: DataItem, b: DataItem) => a.dateasgn - b.dateasgn,
      priority: 1
    },
    {
      name: 'Deadline',
      compare: (a: DataItem, b: DataItem) => a.datesub - b.datesub,
      priority: 3
    }
  ];
  listOfData: DataItem[] = [
    {
      title: 'NAND gate',
      subject: 'Logic Gates',
      datesub: Date.now(),
      dateasgn: Date.now()
    },
    {
      title: 'NAND gate',
      subject: 'Logic Gates',
      datesub: Date.now(),
      dateasgn: Date.now()
    },
    {
      title: 'NAND gate',
      subject: 'Logic Gates',
      datesub: Date.now(),
      dateasgn: Date.now()
    },
    {
      title: 'NAND gate',
      subject: 'Logic Gates',
      datesub: Date.now(),
      dateasgn: Date.now()
    },
    {
      title: 'NAND gate',
      subject: 'Logic Gates',
      datesub: Date.now(),
      dateasgn: Date.now()
    },
    {
      title: 'NAND gate',
      subject: 'Logic Gates',
      datesub: Date.now(),
      dateasgn: Date.now()
    }
  ];

  // trackByName(_: number, item: ColumnItem): string {
  //   return item.name;
  // }

  // sortByDateAssigned(): void {
  //   this.listOfColumns.forEach(item => {
  //     if (item.name === 'Date Assigned') {
  //       item.sortOrder = 'descend';
  //     } else {
  //       item.sortOrder = null;
  //     }
  //   });
  // }

  // sortByDateSubmission(): void {
  //   this.listOfColumns.forEach(item => {
  //     if (item.name === 'Date Assigned') {
  //       item.sortOrder = 'descend';
  //     } else {
  //       item.sortOrder = null;
  //     }
  //   });
}
