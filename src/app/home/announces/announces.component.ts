import { Component, OnInit } from '@angular/core';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AnnounceService } from '../../services/announce.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-announces',
  templateUrl: './announces.component.html',
  styleUrls: ['./announces.component.scss']
})
export class AnnouncesComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private announceService: AnnounceService
  ) {}
  isVisible = false;
  editorTitle = InlineEditor;
  editorConfigTitle = {
    placeholder: 'Enter title of the announcement'
  };
  editorDescription = InlineEditor;
  editorConfigDescription = {
    placeholder: 'Enter description of the announcement'
  };
  curUserAvailable: boolean = false;
  curUser;
  announcementForm: FormGroup;
  announceFiles: File[] = [];
  fileNames = [];

  ngOnInit(): void {
    this.curUser = this.route.snapshot.data.curUser;
    this.curUser = this.curUser.user;
    if (this.curUser) {
      this.curUserAvailable = true;
      console.log(this.curUser);
    }
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      postedby: [this.curUser._id, Validators.required]
    });
  }

  // get files1(): FormArray {
  //   return this.announcementForm.get('files') as FormArray;
  // }

  // createItem(data): FormGroup {
  //   return this.fb.group(data);
  // }

  // onFilesPicked(event: Event) {
  //   let files = (event.target as HTMLInputElement).files;
  //   if (files) {
  //     console.log(files);
  //     for (var i = 0; i < files.length; i++) {
  //       let reader = new FileReader();
  //       this.fileNames.push((event.target as HTMLInputElement).files[i].name);
  //       reader.onload = (e: any) => {
  //         let file = files[i];
  //         const blob = new Blob([new Uint8Array(e.target.result)], {
  //           type: file.type
  //         });
  //         this.files1.push(
  //           this.createItem({
  //             blob,
  //             url: e.target.result
  //           })
  //         );
  //       };
  //       reader.readAsDataURL(files[i]);
  //     }
  //     console.log(this.announcementForm.value.files);
  //   }
  // }

  onFilesPicked(event: Event) {
    for (var i = 0; i < (event.target as HTMLInputElement).files.length; i++) {
      this.fileNames.push((event.target as HTMLInputElement).files[i].name);
      this.announceFiles.push((event.target as HTMLInputElement).files[i]);
    }
  }

  onSubmit() {
    console.log(this.announcementForm.value);
    let atime = Date.now();
    if (this.announcementForm.invalid) {
      console.log('invalid announcement');
      return;
    }
    this.announceService.addAnnounce(
      this.announcementForm.value.postedby,
      this.announcementForm.value.title,
      this.announcementForm.value.description,
      atime,
      this.announceFiles
    );
    // this.announceFiles = [];
    // this.announcementForm.patchValue({
    //   title: '',
    //   description: '',
    //   postedby: this.curUser._id
    // });
    // console.log(this.announceFiles);
    // console.log(this.announcementForm.value);
  }

  list = [1, 2, 3, 4, 5];
  acontent = 'this is the firs sfdf dsfsdf t dafgasf dfsa sdfas dfas sdffa';
  adate = Date.now();
}
