import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  public isAuthenticated(): Boolean {
    const token = localStorage.getItem("access_token");
    // Check whether the token is expired and return
    // true or false
    return token ? true : false;
  }
  public getToken() {
    return localStorage.getItem("access_token");
  }

  public getUserName() {
    let userData = JSON.parse(localStorage.getItem("user_data"));
    return userData["user"]["username"];
  }
  public getUserEmail() {
    let userData = JSON.parse(localStorage.getItem("user_data"));
    return userData["user"]["email"];
  }
  public getUserGroup() {
    let userData = JSON.parse(localStorage.getItem("user_data"));
    return userData["groups"][0];
  }

  public getUser() {
    return JSON.parse(localStorage.getItem("user_data"))["user"];
  }
}
