import { Component, OnInit } from '@angular/core';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn
} from '@angular/forms';
import {
  NzNotificationService,
  NzNotificationPlacement
} from 'ng-zorro-antd/notification';
import { ActivatedRoute } from '@angular/router';
import { NotesService } from '../../services/notes.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  placement: NzDrawerPlacement = 'bottom';
  notesForm: FormGroup;
  fileName: string;
  notPlacement: NzNotificationPlacement;
  branches;
  submitFileError: boolean = false;
  sems;
  curUser;
  notes;
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
    private notesService: NotesService
  ) {
    this.notesService.search(this.searchTerm$).subscribe(res => {
      this.notes = res;
    });
  }

  ngOnInit(): void {
    this.curUser = this.route.snapshot.data.curUser;
    this.notes = this.route.snapshot.data.notes;
    this.notes = this.notes.notes;
    console.log(typeof this.notes[0].date);
    this.notes = this.notes.sort((a, b) => a.date - b.date);
    console.log(this.notes);
    this.notesForm = this.fb.group({
      creator: ['', Validators.required],
      topic: ['', Validators.required],
      subject: ['', Validators.required],
      branch: ['', Validators.required],
      semester: ['', Validators.required],
      file: [null, [Validators.required, this.fileExtValidator]]
    });
    if (this.curUser) {
      this.curUser = this.curUser.user;
      this.curUserDes = this.curUser.designation;
      console.log('designation ' + this.curUserDes);
      this.notesForm.patchValue({ creator: this.curUser._id });
      this.notesForm.get('creator').updateValueAndValidity();
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
    this.notesForm.patchValue({ file: file });
    this.notesForm.get('file').updateValueAndValidity();
    console.log(this.notesForm.value.file);
    if (this.notesForm.controls.file.status === 'VALID') {
      this.fileName = file.name;
      console.log(this.fileName);
    }
    if (this.notesForm.controls.file.status === 'INVALID') {
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

  checkDeletable(bookCreator : string){
    if(!this.curUser){
      return false; 
    }
    if(bookCreator === this.curUser._id){
      return true;
    }
  }

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
    this.notesForm.patchValue({ file: '' });
  }

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }

  onSubmit() {
    for (const i in this.notesForm.controls) {
      this.notesForm.controls[i].markAsDirty();
      this.notesForm.controls[i].updateValueAndValidity();
    }
    if (this.notesForm.controls.file.status === 'INVALID') {
      this.submitFileError = true;
    } else if (this.notesForm.status === 'VALID') {
      this.notesService.addNotes(
        this.notesForm.value.creator,
        this.notesForm.value.topic,
        this.notesForm.value.subject,
        this.notesForm.value.branch,
        this.notesForm.value.semester,
        this.notesForm.value.file
      );
    }
  }

  getFile(filename: string) {
    console.log(filename);
    this.notesService.getFile(filename);
  }

  log(value: object[]): void {
    // console.log(value);
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
    this.notesService.filterRes(filterItems).subscribe(res => {
      console.log(res);
      this.notes = res;
    });
  }

  change(value: boolean): void {
    console.log(value);
  }
}
