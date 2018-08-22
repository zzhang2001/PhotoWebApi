import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit() {
    if (this.userService.sessStorage == null) {
      this.userService.sessStorage = window.sessionStorage;
    }
    this.userService.SetUserFromToken();
  }

  Logout(): void {
    this.userService.Logout();
  }
}
