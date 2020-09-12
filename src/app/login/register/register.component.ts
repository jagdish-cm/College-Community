import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidationErrors
} from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { CurUser } from '../../models/curuser.model';
import { CurUserService } from '../../services/cur-user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  regForm: FormGroup;
  cuser: CurUser;

  isLoading: boolean = false;
  onSubmit(): void {
    this.isLoading = true;
    const newUser: CurUser = {
      _id: null,
      batchFrom: this.regForm.value.batchFrom,
      batchTo: this.regForm.value.batchTo,
      enrolNo: this.regForm.value.enrolNo,
      name: this.regForm.value.name,
      mobile: this.regForm.value.mobile,
      email: this.regForm.value.email,
      branch: this.regForm.value.branch,
      password: this.regForm.value.password
    };
    console.log(newUser);

    this.authUser.createUser(
      newUser.batchFrom,
      newUser.batchTo,
      newUser.enrolNo,
      newUser.name,
      newUser.mobile,
      newUser.email,
      newUser.branch,
      newUser.password
    );
  }

  constructor(public authUser: AuthService, private fb: FormBuilder) {
    this.regForm = this.fb.group({
      batchFrom: ['', [Validators.required]],
      batchTo: ['', [Validators.required]],
      enrolNo: ['', [Validators.required, Validators.maxLength(3)]],
      name: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      branch: ['ECE', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirm: ['', [this.confirmValidator]]
    });
  }

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.regForm.controls.password.value) {
      return { error: true, confirm: true };
    }
    return {};
  };
}
