import { Component, OnInit } from '@angular/core';
import {User} from "./user";
import {AppService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user = new User()

  constructor(private apiService: AppService) { }

  ngOnInit(): void {
  }

  addUser() {
    this.apiService.addUser(this.user).subscribe(data=>{
      console.log(data)
    })
  }

  login() {
    this.apiService.login(this.user).subscribe(data=>{
      console.log(data)
    })
  }
}
