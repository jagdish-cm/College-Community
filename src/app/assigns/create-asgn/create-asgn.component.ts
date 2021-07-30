import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';
import { AsgnService } from 'src/app/services/asgn.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-create-asgn',
  templateUrl: './create-asgn.component.html',
  styleUrls: ['./create-asgn.component.scss'],
})
export class CreateAsgnComponent implements OnInit {
  date7;
  uploadedFiles: File[] = [];
  branches;
  sems;
  selectedCity;
  asgnForm: FormGroup;
  items = [];

  constructor(
    private fb: FormBuilder,
    private eventService: EventService,
    private authService: AuthService,
    private asgnService: AsgnService,
    private utilService: UtilitiesService
  ) {
    this.branches = utilService.getBranches();
    this.sems = utilService.getSems();
  }

  ngOnInit(): void {
    this.asgnForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: [''],
      semester: ['', Validators.required],
      branch: ['', Validators.required],
      subject: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.authService.isLogged()) {
      let curUser = this.authService.getCurUser();
      this.asgnService
        .addAsgn(
          curUser._id,
          this.asgnForm.value.title,
          this.asgnForm.value.description,
          this.asgnForm.value.deadline,
          this.asgnForm.value.semester,
          this.asgnForm.value.branch,
          this.asgnForm.value.subject,
          this.uploadedFiles
        )
        .subscribe((result) => {
          console.log(result);
          console.log(result + 'asgn created');
          this.items = result.newasgn.files;
        });
    }
  }

  onUpload(event) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    console.log(this.uploadedFiles);
  }

  onDelete(event) {
    // console.log(event);
    for (let i in this.uploadedFiles) {
      console.log(i);
      let j = Number(i);
      if (this.uploadedFiles[j] == event.file) {
        this.uploadedFiles.splice(j, 1);
        console.log(this.uploadedFiles);
      }
    }
  }
}
