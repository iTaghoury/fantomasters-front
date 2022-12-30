import { Component } from '@angular/core';
import { User } from 'src/types';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import { UserService } from '../user.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  faTrash = faTrash;
  faPlus = faPlus;
  user: User = this.app.user;
  newFriendId: string = '';
  errorMessage: string = '';
  err: boolean = false;
  usersList: string[] = [];

  constructor(
    private userService: UserService,
    private app: AppComponent
  ) {}

  ngOnInit(): void {
    this.userService.getUser(this.user.id)
      .subscribe(user => {
        this.user = user
      });

    this.userService.getUsersList(this.user.id)
      .subscribe(usersList => {
        this.usersList = usersList
      })
  }

  addFriend(friendId: string) {
    this.userService.addFriend(this.user.id, friendId)
      .subscribe(user => {
        this.err = false;
        this.user = user;
        this.newFriendId = '';
        this.app.ngOnInit(user);
      }, error => {
        this.errorMessage = error.error;
        this.err = true;
      })
  }

  /*deleteFriend(user: User, friend: string): void {
    this.userService.deleteFriend(user.id, friend)
      .subscribe(user => {
        this.user = user;
        this.app.ngOnInit(user);
      })
    this.userService.getUsersList(this.user.id)
      .subscribe(usersList => {
        this.usersList = usersList;
      })*/
      
  deleteFriend(user: User, friend: string): void {
    this.userService.deleteFriend(user.id, friend)
      .subscribe(user => {
        this.user = user;
        this.app.ngOnInit(user);
      })
  }

  onSubmit(): void {
    this.addFriend(this.newFriendId);
  }
}
