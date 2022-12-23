import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { User } from 'src/types';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(
    private http: HttpClient,
  ) { }

  getUser(id :string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`)
  }

  addFriend(id: string, friendId: string): Observable<User> {
    return this.http.put<User>(`/api/users/${id}/addFriend/${friendId}`, {}, httpOptions)
  }
  deleteFriend(id: string, friendId: string): Observable<User> {
    return this.http.delete<User>(`/api/users/${id}/deleteFriend/${friendId}`)
  }

  editRole(id: string, role: string): Observable<User> {
    return this.http.put<User>(`/api/users/${id}/modify-role/${role}`, {}, httpOptions)
  }

  logOut(id: string) : Observable<User> {
    return this.http.put<User>(`/api/users/${id}/logout`, {}, httpOptions);
  }

  logIn(id: string, password: string): Observable<User> {
    return this.http.put<User>(`/api/users/${id}/login`, { password }, httpOptions);
  }

  signUp(id: string, password: string): Observable<User> {
    return this.http.post<User>(`/api/signup/${id}`, { password }, httpOptions);
  }

  

}
