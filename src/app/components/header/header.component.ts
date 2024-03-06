import { Component, inject} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { Observable } from 'rxjs';
import { makeItFalse, makeItTrue } from '../../state/reducers/toggle.actions';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  show:boolean = false;
  title:string = "CV Görüntüle";

  isHomePage: boolean =false;

  constructor(){
    this.store.select('toggle').subscribe(r => {
      if(r){
        this.title="CV Gizle"
      }else{
        this.title="CV Görüntüle"
      }
      this.show = r;
    })

    if(this.router.url.includes("courserInfo")){
      this.isHomePage = true;
    }else{
      this.isHomePage=false;
    }


  }


  toggle(){
    if(this.show == false){
      this.store.dispatch(makeItTrue());
    }else{
      this.store.dispatch(makeItFalse());
    }
  }


  scrollToSection(sectionId: string) {
    const section = document.querySelector(`#${sectionId}`);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }



}
