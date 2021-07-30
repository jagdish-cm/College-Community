import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { Assignment } from './product';
import { AuthService } from '../services/auth.service';
import { AsgnService } from '../services/asgn.service';

@Component({
  selector: 'app-assigns',
  templateUrl: './assigns.component.html',
  styleUrls: ['./assigns.component.scss'],
})
export class AssignsComponent implements OnInit {
  // products: Product[];
  loading: boolean;
  // datasource: Product[];
  totalRecords: number;

  assignments = [];
  uploadedFiles: File[] = [];
  visibleSidebar: boolean = false;
  text;
  date;
  value: string;
  selectedCity;
  sems;
  branches;
  isFac: boolean = false;
  user;

  selectedAsgn;
  selectedSubmittedAsgn;

  display: boolean = false;
  display2: boolean = false;
  display3: boolean = false;
  submittedAsgns = [];

  showDialog(asgn) {
    this.selectedAsgn = asgn;
    if (this.isFac) {
      this.display2 = true;
      this.getStudentNames();
    } else {
      this.display = true;
    }
    console.log(this.selectedAsgn);
  }

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private asgnService: AsgnService
  ) {
    this.branches = [
      'Electronics',
      'Computer Science',
      'Electrical',
      'Agriculture',
      'Mechanical',
      'Civil',
    ];
    this.sems = [1, 2, 3, 4, 5, 6, 7, 8];
  }

  ngOnInit() {
    this.user = this.authService.getCurUser();
    if (!this.user) {
      this.authService.distributeCurUserInfo().subscribe((data) => {
        console.log(data);
        this.user = data;
        if (this.user.designation == 'Faculty') {
          this.isFac = true;
          this.getFacAsgns();
        } else if (this.user.designation == 'Student') {
          this.getStudentAsgns();
        }
      });
    } else {
      if (this.user.designation == 'Student') {
        this.getStudentAsgns();
      } else if (this.user.designation == 'Faculty') {
        this.isFac = true;
        this.getFacAsgns();
      }
    }
    if (this.user && this.user.designation == 'Faculty') {
      this.isFac = true;
    }
  }

  getStudentAsgns() {
    this.asgnService
      .getAsgn(this.user.branch, this.user.semester)
      .subscribe((data) => {
        console.log(data);
        data.asgns.forEach((asgn) => {
          let isSubmitted = false;
          for (let i = 0; i < asgn.submittedBy.length; i++) {
            if (asgn.submittedBy[i].studentId == this.user._id) {
              isSubmitted = true;
              break;
            }
          }
          if (isSubmitted) {
            asgn['status'] = 'completed';
          } else {
            asgn['status'] = 'pending';
          }
          console.log(asgn.status);
        });
        this.assignments = data.asgns;
      });
  }

  getFacAsgns() {
    this.asgnService.getFacAsgns().subscribe((data) => {
      console.log(data);
      this.assignments = data.asgns;
    });
  }

  searchItem(key: string) {
    console.log(key);
  }

  openAssignmentAdder() {}

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
  }

  onDelete(event) {
    for (let i in this.uploadedFiles) {
      console.log(i);
      let j = Number(i);
      if (this.uploadedFiles[j] == event.file) {
        this.uploadedFiles.splice(j, 1);
        console.log(this.uploadedFiles);
      }
    }
  }

  submitAsgn() {
    console.log(this.text);
    if (this.uploadedFiles || this.text) {
      this.asgnService
        .submitAsgn(
          this.selectedAsgn._id,
          this.user._id,
          this.uploadedFiles,
          this.text
        )
        .subscribe((data) => {
          console.log(data);
          this.display = false;
        });
    }
  }

  getStudentNames() {
    this.asgnService
      .getStudentNames(this.selectedAsgn._id)
      .subscribe((data) => {
        console.log(data);
        this.submittedAsgns = data;
      });
  }

  showSelectedAsgnDialog(asgn) {
    this.selectedSubmittedAsgn = asgn;
    this.display3 = true;
  }
}
