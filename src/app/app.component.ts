import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { Store } from '@ngrx/store';
import { AppState } from './state/reducers';
import { loadTexts } from './state/texts/texts.actions';
import { getTexts } from './state/texts/texts.selector';
import { getAllApplicants } from './state/applicants/applicants.selector';
import { loadApplicants } from './state/applicants/applicants.actions';
import { autoLogin } from './components/auth/state/auth.actions';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'Özge Eşer';
  constructor(private store:Store<AppState>, private router: Router){

  }
  ngOnInit(): void {
    this.getTexts();
    // this.store.dispatch(loadTexts());
    this.getApplicants();
    if(localStorage.getItem('userData')){
      this.store.dispatch(autoLogin());
    }
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }




  getTexts() {
    this.store.select(getTexts).subscribe((response) => {
      if (response.length == 0) {
        this.store.dispatch(loadTexts());
      }
    });
  }

  getApplicants() {
    this.store.select(getAllApplicants).subscribe((response) => {
      if (response.length == 0) {
        this.store.dispatch(loadApplicants());
      }
    });
  }
}
