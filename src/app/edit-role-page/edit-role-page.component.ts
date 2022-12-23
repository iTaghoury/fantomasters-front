import { Component } from '@angular/core';
import { Role, User } from 'src/types';
import { UserService } from '../user.service';
import { roles } from '../allRoles';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-edit-role-page',
  templateUrl: './edit-role-page.component.html',
  styleUrls: ['./edit-role-page.component.css']
})
export class EditRolePageComponent {

  user: User = this.app.user

  constructor(
    private userService: UserService,
    private app: AppComponent
  ) {}
  allRoles: Role[] = roles;

  ngOnInit(): void {
    this.userService.getUser(this.app.user.id)
      .subscribe(user => {
        this.user = user
      });
  }

  editRole(role: string): void {
    this.userService.editRole(this.user.id, role)
      .subscribe(user => {
        this.user = user;
        this.app.ngOnInit(user);
      })
  }

}
