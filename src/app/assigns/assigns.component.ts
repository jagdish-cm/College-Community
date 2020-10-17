import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { Assignment } from './product';




@Component({
  selector: 'app-assigns',
  templateUrl: './assigns.component.html',
  styleUrls: ['./assigns.component.scss']
})
export class AssignsComponent implements OnInit {
  // products: Product[];
  loading: boolean;
  // datasource: Product[];
  totalRecords: number;

  assignments : Assignment[];
  visibleSidebar: boolean = false;
  text : string ;
  date;
  value : string;
  selectedCity;
  sems;
  branches;

  constructor(private productService: ProductService) {
    this.branches = [
      'Electronics',
      'Computer Science',
      'Electrical',
      'Agriculture',
      'Mechanical',
      'Civil'
    ];
    this.sems = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  ngOnInit() {
    this.productService.getProductsSmall().then(data => {
      this.assignments = data;
    });
  }

  searchItem(key : string){
    console.log(key);
  }

  openAssignmentAdder(){

  }
  

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

}