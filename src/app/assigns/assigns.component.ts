import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { Product } from './product';

// interface DataItem {
//   title: string;
//   subject: string;
//   dateasgn: number;
//   datesub: number;
// }

@Component({
  selector: 'app-assigns',
  templateUrl: './assigns.component.html',
  styleUrls: ['./assigns.component.scss']
})
export class AssignsComponent implements OnInit {
    products: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => this.products = data);
    };

    













  // listOfColumn = [
  //   {
  //     name: 'Title'
  //   },
  //   {
  //     name: 'Subject'
  //   },
  //   {
  //     name: 'Date Assigned',
  //     compare: (a: DataItem, b: DataItem) => a.dateasgn - b.dateasgn,
  //     priority: 1
  //   },
  //   {
  //     name: 'Deadline',
  //     compare: (a: DataItem, b: DataItem) => a.datesub - b.datesub,
  //     priority: 3
  //   }
  // ];
  // listOfData: DataItem[] = [
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   },
  //   {
  //     title: 'NAND gate',
  //     subject: 'Logic Gates',
  //     datesub: Date.now(),
  //     dateasgn: Date.now()
  //   }
  // ];
}
