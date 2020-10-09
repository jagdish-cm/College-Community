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
  isLoading: boolean = false;
  announces;
  curUserDes;

  ngOnInit(): void {
    this.curUser = this.route.snapshot.data.curUser;
    if (this.curUser) {
      this.curUser = this.curUser.user;
      this.curUserDes = this.curUser.designation;
      console.log('designation ' + this.curUserDes);
    }
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      description: [' '],
      postedby: ['', Validators.required]
    });
    this.isLoading = true;
    this.announces = this.route.snapshot.data.announces;
    this.announces = this.announces.announces;
    console.log('announcements are here');
    console.log(this.announces);
    this.announces = this.announces.sort((a, b) => b.time - a.time);
    this.isLoading = true;
    if (this.curUser) {
      this.announcementForm.patchValue({ postedby: this.curUser._id });
      this.announcementForm.get('postedby').updateValueAndValidity();
      this.curUserAvailable = true;
      console.log(this.curUser);
    }
  }

  onFilesPicked(event: Event) {
    for (var i = 0; i < (event.target as HTMLInputElement).files.length; i++) {
      this.fileNames.push((event.target as HTMLInputElement).files[i].name);
      this.announceFiles.push((event.target as HTMLInputElement).files[i]);
    }
  }

  removeFile(i: number) {
    if (i > -1) {
      this.announceFiles.splice(i, 1);
      this.fileNames.splice(i, 1);
    }
    console.log(this.announceFiles, this.fileNames);
  }

  onSubmit() {
    console.log(this.announcementForm);
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
  }
}
