import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/reducers';
import { loginStart } from '../state/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    })
  }

  onLoginSubmit(){
    console.log("asdf");
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;
    this.store.dispatch(loginStart({email,password}));
    // this.store.dispatch(setLoadingSpinner({status:true, from:"login start"}))
  }

}
