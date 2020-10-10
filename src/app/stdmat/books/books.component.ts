import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';
import {
  NzNotificationService,
  NzNotificationPlacement
} from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { BooksService } from '../../services/books-service.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  placement: NzDrawerPlacement = 'bottom';
  booksForm: FormGroup;
  fileName: string;
  notPlacement: NzNotificationPlacement;
  branches;
  submitFileError: boolean = false;
  sems;
  curUser;
  books;
  searchTerm$ = new Subject<string>();
  results: Object;
  checked = true;
  checkOptionOne = [];
  checkOptionTwo = [];
  popVisible: boolean = false;
  filterTerm$ = new Subject<object>();
  curUserDes: any;

  constructor(
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {
    this.booksService.search(this.searchTerm$).subscribe(res => {
      this.books = res;
    });
  }

  ngOnInit(): void {
    this.curUser = this.route.snapshot.data.curUser;
    if (this.curUser) {
      this.curUser = this.curUser.user;
      console.log(this.curUser);
      this.curUserDes = this.curUser.designation;
      console.log('designation ' + this.curUserDes);
    }
    this.books = this.route.snapshot.data.books;
    this.books = this.books.books;
    console.log(typeof this.books[0].date);
    this.books = this.books.sort((a, b) => a.date - b.date);
    console.log(this.books);
    this.booksForm = this.fb.group({
      creator: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      file: [null, [Validators.required, this.fileExtValidator]]
    });
    if (this.curUser) {
      this.booksForm.patchValue({ creator: this.curUser._id });
      this.booksForm.get('creator').updateValueAndValidity();
    }
    this.notPlacement = 'bottomLeft';
    this.branches = [
      'Electronics',
      'Computer Science',
      'Electrical',
      'Agriculture',
      'Mechanical',
      'Civil'
    ];
    this.sems = [1, 2, 3, 4, 5, 6, 7, 8];
    this.branches.forEach(element => {
      let a = {};
      a['label'] = element;
      a['value'] = element;
      a['checked'] = false;
      this.checkOptionOne.push(a);
    });
    this.sems.forEach(element => {
      let a = {};
      a['label'] = element;
      a['value'] = element;
      a['checked'] = false;
      this.checkOptionTwo.push(a);
    });
  }

  printCh(a: string) {
    console.log(a);
  }
  visible = false;

  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.booksForm.patchValue({ file: file });
    this.booksForm.get('file').updateValueAndValidity();
    console.log(this.booksForm.value.file);
    if (this.booksForm.controls.file.status === 'VALID') {
      this.fileName = file.name;
      console.log(this.fileName);
    }
    if (this.booksForm.controls.file.status === 'INVALID') {
      this.createBasicNotification('bottomLeft');
    }
  }

  fileExtValidator: ValidatorFn = (
    control: FormGroup
  ): { [key: string]: boolean } | null => {
    if (control.value) {
      let fileName: string = control.value.name;
      let ext = fileName.substr(fileName.lastIndexOf('.') + 1);
      console.log('extension = ' + ext);
      if (
        ext === 'jpg' ||
        ext === 'jpeg' ||
        ext === 'png' ||
        ext === 'pdf' ||
        ext === 'docx' ||
        ext === 'doc' ||
        ext === 'xlsx' ||
        ext === 'pptx' ||
        ext === 'txt'
      ) {
        console.log('file valid');
        return null;
      }
      console.log('file invalid');
      return { fileInvalid: true };
    }
  };

  createBasicNotification(position: NzNotificationPlacement): void {
    this.notification.blank(
      'Invalid File Type',
      'File must be of type : .jpg, .jpeg, .png, .txt, .pdf, .docx, .doc, .xlsx, .pptx',
      {
        nzPlacement: position,
        nzStyle: {
          width: '600px',
          color: 'red'
        },
        nzClass: 'test-class'
      }
    );
  }

  removeFile() {
    this.fileName = null;
    this.booksForm.patchValue({ file: '' });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    for (const i in this.booksForm.controls) {
      this.booksForm.controls[i].markAsDirty();
      this.booksForm.controls[i].updateValueAndValidity();
    }
    if (this.booksForm.controls.file.status === 'INVALID') {
      this.submitFileError = true;
    } else if (this.booksForm.status === 'VALID') {
      this.booksService.addBook(
        this.booksForm.value.creator,
        this.booksForm.value.title,
        this.booksForm.value.author,
        this.booksForm.value.branch,
        this.booksForm.value.semester,
        this.booksForm.value.file
      );
    }
  }

  getFile(filename: string) {
    console.log(filename);
    this.booksService.getFile(filename);
  }

  submitFilter(): void {
    this.popVisible = false;
    let branchFilters = [];
    let semFilters = [];
    this.checkOptionOne.forEach(element => {
      if (element.checked == true) {
        branchFilters.push(element.value);
      }
    });
    this.checkOptionTwo.forEach(element => {
      if (element.checked == true) {
        semFilters.push(element.value);
      }
    });
    let filterItems = {};
    filterItems['branch'] = branchFilters;
    filterItems['sem'] = semFilters;
    if (!branchFilters.length && !semFilters.length) {
      console.log('not there');
      filterItems['branch'] = this.branches;
      filterItems['sem'] = this.sems;
    }
    this.booksService.filterRes(filterItems).subscribe(res => {
      console.log(res);
      this.books = res;
    });
  }
}
