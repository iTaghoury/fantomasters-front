import { Component } from '@angular/core';
import { User } from 'src/types';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor(
    private userService: UserService,
    private app: AppComponent
  ) {}
  err: boolean = false;
  errorMessage: string = '';
  user: User = this.app.user

  logIn(id: string, password: string) {
    this.userService.logIn(id, password)
      .subscribe(user => { 
        this.user = user;
        this.app.ngOnInit(user);
      }, error => {
        this.err = true;
        console.log(" ERREUR " + error.error);
        this.errorMessage = error.error;
      })
  }
}
