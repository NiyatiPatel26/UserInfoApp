import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from 'src/app/user/shared/services/shared.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  constructor(private service: SharedService, private route: Router) { }

  @ViewChild(MatPaginator, {
    static: true
  })
  paginator!: MatPaginator

  displayedColumns: string[] = ['First_Name', 'Created_On', 'Email', 'Add_State', 'Action']

  UserList = new MatTableDataSource<Object>([]);

  user_id_update: string;

  ngOnInit(): void {
    this.refreshUserList();
    this.UserList.paginator = this.paginator;
  }

  addClick() {
    this.route.navigate(['AddEditUser/adduser'])
  }

  updateUserdata(u_id) {
    this.user_id_update = u_id.user_id
    if (this.user_id_update !== undefined) {
      this.route.navigate(['user', this.user_id_update])
    }
  }

  deleteClick(item) {
    if (confirm('Are you sure??')) {
      this.service.deleteUser(item.user_id).subscribe(data => {
        alert(data.toString());
        this.refreshUserList();
      })
    }
  }

  refreshUserList() {
    this.service.getUserList().subscribe(data => {
      this.UserList.data = data;
      console.log(this.UserList)
    });
  }

}

