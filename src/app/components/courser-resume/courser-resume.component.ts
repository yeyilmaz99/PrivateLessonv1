import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { makeItFalse, makeItTrue } from '../../state/reducers/toggle.actions';

@Component({
  selector: 'app-courser-resume',
  standalone: true,
  imports: [],
  templateUrl: './courser-resume.component.html',
  styleUrl: './courser-resume.component.css'
})
export class CourserResumeComponent {
  private store = inject(Store<AppState>)
  show:boolean = false;

  constructor(){
    this.store.select('toggle').subscribe(r => {
      this.show = r;
      console.log(this.show)
    })
  }


  toggle(){
    this.store.select('toggle').subscribe(r => {
      this.show = r;
    })
    if(this.show == false){
      this.store.dispatch(makeItTrue());
    }else{
      this.store.dispatch(makeItFalse());
      this.scrolToTop()
    }
  }


  scrolToTop(){
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
