import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from './shared/api.service';
import { UserModel } from '../app/register/register.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-crud';
  userList: any;
  registerForm: FormGroup = new FormGroup({});
  showAdd!: boolean;
  showUpdate!: boolean;
  userModelObj: UserModel = new UserModel();
  submitted = false;

  constructor(private formbuilder: FormBuilder, private api: ApiService) {}

  ngOnInit() {
    this.registerForm = this.formbuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      phone: [''],
      company: [''],
      gender: [''],
      dob: [''],
      password: [''],
      confirmPassword: [''],
    });
    this.getallUsers();
    this.showAdd = true;
    this.showUpdate = false;
  }
  onSubmit() {
    this.submitted = true;

    this.userModelObj.firstName = this.registerForm.value.firstName;
    this.userModelObj.lastName = this.registerForm.value.lastName;
    this.userModelObj.email = this.registerForm.value.email;
    this.userModelObj.phone = this.registerForm.value.phone;
    this.userModelObj.company = this.registerForm.value.company;
    this.userModelObj.gender = this.registerForm.value.gender;
    this.userModelObj.dob = this.registerForm.value.dob;
    this.userModelObj.password = this.registerForm.value.password;

    this.api.postUsers(this.userModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('User Added Successfully');
        this.registerForm.reset();
        this.getallUsers();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  getallUsers() {
    this.api.getUsers().subscribe((res) => {
      this.userList = res;
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.registerForm.controls['firstName'].setValue(row.firstName);
    this.registerForm.controls['lastName'].setValue(row.lastName);
    this.registerForm.controls['email'].setValue(row.email);
    this.registerForm.controls['phone'].setValue(row.phone);
    this.registerForm.controls['company'].setValue(row.company);
    this.registerForm.controls['gender'].setValue(row.gender);
    this.registerForm.controls['dob'].setValue(row.dob);
    this.registerForm.controls['password'].setValue(row.password);
  }
  updateUserDetail() {
    this.userModelObj.firstName = this.registerForm.value.firstName;
    this.userModelObj.lastName = this.registerForm.value.lastName;
    this.userModelObj.email = this.registerForm.value.email;
    this.userModelObj.phone = this.registerForm.value.phone;
    this.userModelObj.company = this.registerForm.value.company;
    this.userModelObj.gender = this.registerForm.value.gender;
    this.userModelObj.dob = this.registerForm.value.dob;
    this.userModelObj.password = this.registerForm.value.password;
    this.api
      .UpdateUsers(this.userModelObj, this.userModelObj.id)
      .subscribe((res) => {
        alert('User Updated Successfully');
        this.getallUsers();
        this.registerForm.reset();
        this.showAdd = true;
        this.showUpdate = false;
      });
  }
  Cancel() {
    this.registerForm.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  deleteUserDetails(row: any) {
    this.api.deleteUsers(row.id).subscribe((res) => {
      alert('User Deleted Successfully');
      this.getallUsers();
      this.registerForm.reset()
      this.showAdd = true;
      this.showUpdate = false;
    });
  }
}
