import { Component } from '@angular/core';
import { UserService } from './user.service';
import { User } from 'src/types';
import { LoginPageComponent } from './login-page/login-page.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PhantoMasters';
  
  user: User = {id: '', isConnected: false, role: '', friends: []}
  constructor(
    private userService: UserService,
  ) {}

  
  public ngOnInit(user: User): void {
    this.userService.getUser(user.id)
      .subscribe(user => this.user = user);
  }

  logOut(): void {
    this.userService.logOut(this.user.id)
      .subscribe(user => {
        this.user = user;
      });
  }
}
