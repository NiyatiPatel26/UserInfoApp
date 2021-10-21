import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/user/shared/services/shared.service';

@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {

  UserInfoForm: FormGroup;

  @Input() userForm: FormGroup;

  user_id_update: string;

  UserListEdit: Array<Object> = []

  public UserListRead: Array<Object> = []

  constructor(private sharedservice: SharedService,
    private route: ActivatedRoute,
    private _formBuilder: FormBuilder) { }


  ngOnInit(): void {
    var d = new Date();
    var CreatedDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    this.user_id_update = this.route.snapshot.params['data'];

    if (Number(this.user_id_update) > 0) {
      this.UpdateUserFormCreation(Number(this.user_id_update))
    }
    else {
      this.AddUserFormCreation(CreatedDate)
    }
  }

  AddUserFormCreation(CreatedDate) {
    this.UserInfoForm = new FormGroup({
      'PersonalDetails': new FormGroup({
        'First_Name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
        'Middle_Name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
        'Last_Name': new FormControl(null, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z]+')]),
        'Email': new FormControl(null, [Validators.required, Validators.email]),
        'Date_Of_Birth': new FormControl(null, Validators.required),
        'Phone_No': new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10), Validators.maxLength(10)]),
      }),
      'AddressDetails': new FormGroup({
        'Add_City': new FormControl(null, [Validators.required]),
        'Add_State': new FormControl(null, [Validators.required]),
        'Add_Zip': new FormControl(null, [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(6), Validators.maxLength(6)]),
        'Created_On': new FormControl(CreatedDate, [Validators.required])
      })

    });
  }

  UpdateUserFormCreation(userid: number) {
    this.sharedservice.getParticularUserData(userid).subscribe(data => {
      this.UserListEdit = data;
      for (let i of this.UserListEdit) {
        if (i["user_id"] == this.user_id_update) {

          this.UserListRead.push(i)

          for (let i1 of this.UserListRead) {

            this.UserInfoForm.controls["PersonalDetails"].setValue({
              First_Name: i1["First_Name"],
              Middle_Name: i1["Middle_Name"],
              Last_Name: i1["Last_Name"],
              Email: i1["Email"],
              Date_Of_Birth: i1["Date_Of_Birth"],
              Phone_No: i1["Phone_No"]
            });

            this.UserInfoForm.controls["AddressDetails"].setValue({
              Add_City: i1["Add_City"],
              Add_State: i1["Add_State"],
              Add_Zip: i1["Add_Zip"],
              Created_On: i1["Created_On"]
            });
          }
        }
      }
    })

    this.UserInfoForm = new FormGroup({
      'PersonalDetails': new FormGroup({
        'First_Name': new FormControl(null, Validators.required),
        'Middle_Name': new FormControl(null, Validators.required),
        'Last_Name': new FormControl(null, Validators.required),
        'Email': new FormControl(null, [Validators.required, Validators.email]),
        'Date_Of_Birth': new FormControl(null, Validators.required),
        'Phone_No': new FormControl(null, Validators.required),
      }),
      'AddressDetails': new FormGroup({
        'Add_City': new FormControl(null, [Validators.required]),
        'Add_State': new FormControl(null, [Validators.required]),
        'Add_Zip': new FormControl(null, [Validators.required]),
        'Created_On': new FormControl(null, [Validators.required])
      })
    });
  }
}