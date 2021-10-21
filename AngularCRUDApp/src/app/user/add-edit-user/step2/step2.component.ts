import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/user/shared/services/shared.service';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  constructor(private route: ActivatedRoute,
    private service: SharedService) { }

  user_id_update: string

  UserListEdit: Array<Object> = []
  public UserListRead: Array<Object> = []
  formEditable: boolean = false
  @Input() userForm: FormGroup;

  ngOnInit(): void {

  }

  step2Submitted() {
    this.userForm.get('AddressDetails').get('Add_City').markAsTouched();
    this.userForm.get('AddressDetails').get('Add_City').updateValueAndValidity();

    this.userForm.get('AddressDetails').get('Add_State').markAsTouched();
    this.userForm.get('AddressDetails').get('Add_State').updateValueAndValidity();

    this.userForm.get('AddressDetails').get('Add_Zip').markAsTouched();
    this.userForm.get('AddressDetails').get('Add_Zip').updateValueAndValidity();

    this.userForm.get('AddressDetails').get('Created_On').markAsTouched();
    this.userForm.get('AddressDetails').get('Created_On').updateValueAndValidity();
  }
}