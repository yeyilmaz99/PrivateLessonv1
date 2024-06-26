import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { Observable } from 'rxjs';
import { User } from '../../models/userModel';
import { SingleResponseModel } from '../../models/singleResponseModel';
import { AuthResponseData } from '../../models/authResponseData';
import { Claims } from '../../models/claimsModel';
import { isAdmin, isAuthenticated } from '../../components/auth/state/auth.selector';
import { autoLogout } from '../../components/auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = 'https://localhost:44345/api/Auth/';
  
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>,
    private localStorageService: LocalStorageService, private jwtHelper:JwtHelperService) {
  }

  login(email: string, password: string): Observable<SingleResponseModel<AuthResponseData>> {
    let newPath = this.apiUrl + "login";
    return this.http.post<SingleResponseModel<AuthResponseData>>(
      newPath,{ email, password }
    );
  }

  // register(register:Register): Observable<SingleResponseModel<AuthResponseData>> {
  //   let newPath = this.apiUrl + "register";
  //   return this.http.post<SingleResponseModel<AuthResponseData>>(newPath,register);

  // }

  formatUser(data: AuthResponseData) {
    const claims = this.getClaims();
    let isAdmin= false;
    if(claims.roles.includes("admin")){
      isAdmin = true
    }else{
      isAdmin = false
    }
    const user = new User(claims.userId,claims.fullName,claims.fullName,claims.email,true,data.token,new Date(data.expiration))
    return {user,isAdmin}
  }


  // getToken() {
  //   const userData =  this.localStorageService.getItem('userData');
  //   return userData
    
  // }

  getClaims() {
    let token = this.localStorageService.getItem('token')
    if (token != null) {
      this.localStorageService.setItem('token',token);
      let tokenDetails = Object.entries(this.jwtHelper.decodeToken(token))
      let claims: Claims = new Claims;
      tokenDetails.forEach(detail => {
        switch (detail[0]) {
          case "email": {
            claims.email = String(detail[1]);
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": {
            claims.userId = Number(detail[1])
            break;
          }
          case "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": {
            claims.fullName = String(detail[1]);
            break;
          }
          case "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": {
            claims.roles = detail[1] as Array<string>
            break;
          }
        }
      });
      if (!claims.roles) {
        claims.roles = [];
      }
      return claims

    }
    return undefined
  }


  // getErrorMessage(message: string) {
  //   switch (message) {
  //     case 'EMAIL_NOT_FOUND':
  //       return 'Email not found';
  //     case 'INVALID_PASSWORD':
  //       return 'Invalid Password';
  //     case 'EMAIL_EXISTS':
  //       return 'Email is already exists'
  //     default:
  //       return 'Unknown Error Occured, Please try again later';
  //   }
  // }




  setUserInLocalStorage(user: User) {
    localStorage.setItem('userData', JSON.stringify(user));
    this.runTimeoutInterval(user);
  }


  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime()
    const timeInterval = expirationDate - todaysDate;
    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout())
      //logout func or get the refresh token
    }, timeInterval)
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('userData');
    if (userDataString) {
      let userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate)
      const user = new User(userData.id, userData.firstName, userData.lastName, userData.email, userData.status, userData.token, expirationDate);
      this.runTimeoutInterval(user);
      return user;
    } else {
      return null;
    }
  }

  logout() {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }

  isAdmin():boolean{
    let claims:Claims | undefined = this.getClaims();
    if(claims.roles.includes("admin")){
      return true
    }else{
      return false
    }
  }

  checkIsAdmin():boolean{
    let adminCheck:boolean
    this.store.select(isAdmin)
    this.store.select(isAdmin).subscribe(response => {
      if(response === true){
        adminCheck = response
      }else {
        adminCheck = false;
      }
    })
    return adminCheck;
  }

  isAuthenticated():boolean{
    let isLoggedIn:boolean
    this.store.select(isAuthenticated).subscribe(response => {
      if(response === true){
        isLoggedIn = response
      }else {
        isLoggedIn = false;
      }
    })
    return isLoggedIn;
  }

}