import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/user/shared/services/shared.service';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.css']
})
export class Step3Component implements OnInit {
  Dataa: Array<string> = new Array;

  buttonText: string;

  userinput: string;

  constructor(private sharedservice: SharedService,
    private route: ActivatedRoute,
    private router: Router) { }

  @Input() userForm: FormGroup;
  formSubmitted: boolean = false;

  user_id_update: string;

  ngOnInit(): void {
    this.user_id_update = this.route.snapshot.params['data'];
    if (Number(this.user_id_update) > 0) {
      this.buttonText = "UPDATE"
    }
    else {
      this.buttonText = "ADD"
    }
  }

  submit() {
    this.formSubmitted = true;

    if (Number(this.user_id_update) > 0) {
      this.updateUserdata(Number(this.user_id_update))
    }
    else {
      this.postUserdata()
    }
  }

  postUserdata() {
    var val = {
      "First_Name": this.userForm.value.PersonalDetails.First_Name,
      "Middle_Name": this.userForm.value.PersonalDetails.Middle_Name,
      "Last_Name": this.userForm.value.PersonalDetails.Last_Name,
      "Email": this.userForm.value.PersonalDetails.Email,
      "Date_Of_Birth": this.userForm.value.PersonalDetails.Date_Of_Birth,
      "Phone_No": this.userForm.value.PersonalDetails.Phone_No,
      "Add_City": this.userForm.value.AddressDetails.Add_City,
      "Add_State": this.userForm.value.AddressDetails.Add_State,
      "Add_Zip": this.userForm.value.AddressDetails.Add_Zip,
      "Created_On": this.userForm.value.AddressDetails.Created_On
    }

    this.sharedservice.addUser(val).subscribe(data => {
      this.userinput = data.toString();
      alert(this.userinput);
      this.router.navigate(['user'])
    })
  }

  updateUserdata(u_id) {
    var val = {
      "user_id": Number(u_id),
      "First_Name": this.userForm.value.PersonalDetails.First_Name,
      "Middle_Name": this.userForm.value.PersonalDetails.Middle_Name,
      "Last_Name": this.userForm.value.PersonalDetails.Last_Name,
      "Email": this.userForm.value.PersonalDetails.Email,
      "Date_Of_Birth": this.userForm.value.PersonalDetails.Date_Of_Birth,
      "Phone_No": this.userForm.value.PersonalDetails.Phone_No,
      "Add_City": this.userForm.value.AddressDetails.Add_City,
      "Add_State": this.userForm.value.AddressDetails.Add_State,
      "Add_Zip": this.userForm.value.AddressDetails.Add_Zip,
      "Created_On": this.userForm.value.AddressDetails.Created_On
    }

    this.sharedservice.updateUser(val).subscribe(data => {
      this.userinput = data.toString();
      alert(this.userinput);
      this.router.navigate(['user'])
    })
  }

}