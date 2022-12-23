import { Component } from '@angular/core';
import { User } from 'src/types';
import { AppComponent } from '../app.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css']
})
export class SignUpPageComponent {

  constructor (
    private userService: UserService,
    private app: AppComponent,
  ) {}

  user: User = this.app.user;
  err: boolean = false;
  errorMessage: string = '';

  signUp(id: string, password: string, confirmPassword: string): void {
    if(password === confirmPassword && id !== '') {
      this.userService.signUp(id, password)
        .subscribe(user => {
          this.err = false;
          this.user = user;
          this.app.ngOnInit(user);
        }, error => {
          this.err = true;
          this.errorMessage = error.error;
        })
    } else {
      this.err = true;
      this.errorMessage = "Les mots de passe doivent correspondre !"
    }
  }
}
