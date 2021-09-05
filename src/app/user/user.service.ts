import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "../interfaces/user.interface";
import {Observable} from "rxjs";

@Injectable({
  providedIn:'root'
})
export class AppService{
  baseUrl: string = "http://localhost:8080/"
  constructor(private http:HttpClient) {}

  addUser(user : UserInterface):Observable<any>{
    const headers = {'content-type' : 'application/json'};
    const body = JSON.stringify(user);
    console.log(body);
    return this.http.post(this.baseUrl + 'user/signup', body,{'headers':headers})
  }
//   POST http://localhost:3000/user/signup
//     Content-Type: application/json
//
// {
//   "username": "Ali",
//   "password": "123456"
// }
  login(user: UserInterface) {
    return this.http.post(this.baseUrl + 'user/login', user)
  }
}
