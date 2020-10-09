import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../services/event.service';
import InlineEditor from '@ckeditor/ckeditor5-build-inline';
import getISOWeek from 'date-fns/getISOWeek';
import { NzDrawerPlacement } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  eventForm: FormGroup;
  curUser;
  curUserAvailable: boolean = false;
  isLoading: boolean;
  events;
  eventFiles: File[] = [];
  fileNames = [];
  editorDescription = InlineEditor;
  editorConfigDescription = {
    placeholder: 'Enter event description'
  };
  curUserDes;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.curUser = this.route.snapshot.data.curUser;
    if (this.curUser) {
      this.curUser = this.curUser.user;
      this.curUserDes = this.curUser.designation;
      console.log('designation ' + this.curUserDes);
    }
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      description: [' '],
      dates: ['', Validators.required],
      postedby: ['', Validators.required]
    });
    this.isLoading = true;
    this.events = this.route.snapshot.data.events;
    this.events = this.events.events;
    console.log('Events are here');
    console.log(this.events);
    this.events = this.events.sort((a, b) => b.time - a.time);
    this.isLoading = true;
    if (this.curUser) {
      this.curUserAvailable = true;
      console.log(this.curUser);
      this.eventForm.patchValue({ postedby: this.curUser._id });
      this.eventForm.get('postedby').updateValueAndValidity();
    }
  }

  onFilesPicked(event: Event) {
    for (var i = 0; i < (event.target as HTMLInputElement).files.length; i++) {
      this.fileNames.push((event.target as HTMLInputElement).files[i].name);
      this.eventFiles.push((event.target as HTMLInputElement).files[i]);
    }
    console.log(this.eventFiles);
  }

  date = null;

  onChange(result: Date[]): void {
    console.log('onChange: ', result);
    console.log(this.eventForm);
  }

  getWeek(result: Date[]): void {
    console.log('week: ', result.map(getISOWeek));
  }

  visible = false;

  open(): void {
    this.visible = true;
  }

  placement: NzDrawerPlacement = 'bottom';
  close(): void {
    this.visible = false;
  }

  removeFile(i: number) {
    if (i > -1) {
      this.eventFiles.splice(i, 1);
      this.fileNames.splice(i, 1);
    }
    console.log(this.eventFiles, this.fileNames);
  }

  onSubmit() {
    console.log(this.eventForm);
    let atime = Date.now();
    if (this.eventForm.invalid) {
      console.log('invalid announcement');
      return;
    }
    this.eventService.addEvent(
      this.eventForm.value.postedby,
      this.eventForm.value.title,
      this.eventForm.value.description,
      this.eventForm.value.dates,
      atime,
      this.eventFiles
    );
  }
}
