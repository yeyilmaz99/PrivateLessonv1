import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AboutComponent } from '../about/about.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { CourserResumeComponent } from '../courser-resume/courser-resume.component';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-courser-info',
  standalone: true,
  imports: [HeaderComponent,AboutComponent,PortfolioComponent,CourserResumeComponent],
  templateUrl:'./courser-info.component.html',
  styleUrl: './courser-info.component.css'
})
export class CourserInfoComponent {
  private store = inject(Store<AppState>)
  show:boolean = false;

  constructor(){
    this.store.select('toggle').subscribe(res=> {
      this.show = res
    })
  }

}
