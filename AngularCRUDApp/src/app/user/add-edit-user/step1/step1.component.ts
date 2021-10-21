import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/user/shared/services/shared.service';

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css'],
})
export class Step1Component implements OnInit {

  user_id_update: string;
  UserListEdit: Array<Object> = [];
  formEditable: boolean = false
  public UserListRead: Array<Object> = []

  constructor(private service: SharedService,
    private route: ActivatedRoute) { }

  @Input() userForm: FormGroup;

  ngOnInit(): void {


  }
  step1Submitted() {
    this.userForm.get('PersonalDetails').get('First_Name').markAsTouched();
    this.userForm.get('PersonalDetails').get('First_Name').updateValueAndValidity();
    this.userForm.get('PersonalDetails').get('Middle_Name').markAsTouched();
    this.userForm.get('PersonalDetails').get('Middle_Name').updateValueAndValidity();
    this.userForm.get('PersonalDetails').get('Last_Name').markAsTouched();
    this.userForm.get('PersonalDetails').get('Last_Name').updateValueAndValidity();
    this.userForm.get('PersonalDetails').get('Email').markAsTouched();
    this.userForm.get('PersonalDetails').get('Email').updateValueAndValidity();
    this.userForm.get('PersonalDetails').get('Date_Of_Birth').markAsTouched();
    this.userForm.get('PersonalDetails').get('Date_Of_Birth').updateValueAndValidity();
    this.userForm.get('PersonalDetails').get('Phone_No').markAsTouched();
    this.userForm.get('PersonalDetails').get('Phone_No').updateValueAndValidity();
  }
}
