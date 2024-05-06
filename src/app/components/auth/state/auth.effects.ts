import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, mergeMap, of, tap } from "rxjs";
import { autoLogin, autoLogout, loginStart, loginSuccess, } from "./auth.actions";
import { AppState } from "../../../state/reducers";
import { ToastrService } from "ngx-toastr";
import { LocalStorageService } from "../../../services/localStorage/local-storage.service";
import { AuthService } from "../../../services/auth/auth.service";




@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions, 
    private authService: AuthService, 
    private store: Store<AppState>,
    private router:Router,
    private localStorageService:LocalStorageService,
    private toastr:ToastrService
    
    ) {

  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap(action => {
        return this.authService.login(action.email, action.password).pipe(
          map((response) => {
            console.log("geldi")
            // this.store.dispatch(setLoadingSpinner({ status: false ,from : "login" }));
            // this.store.dispatch(setErrorMessage({ message: '' }))
            this.localStorageService.setItem('token',response.data.token)
            const userData = this.authService.formatUser(response.data);
            const user = userData.user
            const isAdmin = userData.isAdmin
            this.authService.setUserInLocalStorage(user);
            this.toastr.success("Successfully Logged In")
            return loginSuccess({ user, redirect:true, admin:isAdmin});
          })
        //   ,
        //   catchError((errResp) => {
        //     const errorMessage = errResp.error;
        //     this.toastr.error(errResp.error,errResp.error)
        //     this.store.dispatch(setLoadingSpinner({ status: false , from:" login error" }));
        //     return of(setErrorMessage({ message: errorMessage }));
        //   })
        );
      })
    );
  });


  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess]),
        tap((action)=> {
        //   this.store.dispatch(setErrorMessage({message:''}))
          if(action.redirect) {
            this.router.navigate(['/']);
            
          }
        })
      )
    },
    {dispatch: false}
  )



//   signUp$ = createEffect(() => {
//     return this.actions$.pipe(ofType(signupStart),exhaustMap(action => {
//       return this.authService.register(action.register).pipe(map(response =>{
//         this.store.dispatch(setLoadingSpinner({status:false, from:"singUp"}))
//         this.localStorageService.setItem('token',response.data.token)
//         const userData = this.authService.formatUser(response.data);
//         const user = userData.user
//         const isAdmin = userData.isAdmin
//         this.authService.setUserInLocalStorage(user);
//         this.toastr.success("Successfully Registered & Logged In")
//         return signupSuccess({user, redirect:true, admin:isAdmin})
//       }),catchError((errResp) => {
//         const errorMessage = errResp.error;
//         this.toastr.error(errResp.error,errResp.error)
//         this.store.dispatch(setLoadingSpinner({ status: false, from:"singUp error" }));
//         return of(setErrorMessage({ message: errorMessage }));
//       })
//       );
//     }))
//   })

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogin), mergeMap((action) => {
      const user = this.authService.getUserFromLocalStorage();
      const isAdmin = this.authService.isAdmin();
      return of(loginSuccess({user, redirect:false, admin:isAdmin}))
    })
    )
  })

  logout$ = createEffect(() => {
    return this.actions$.pipe(ofType(autoLogout), map((action) => {
      this.authService.logout(); 
      this.router.navigate(['login'])
    }))
  }, {dispatch:false})

}