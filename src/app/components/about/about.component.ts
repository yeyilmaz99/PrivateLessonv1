import { Component, OnInit, inject } from '@angular/core';
import { FEndText } from '../../models/textsModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  private store = inject(Store<AppState>);
  header: FEndText;
  boldHeader: FEndText;
  description: FEndText;

  ngOnInit(): void {
    this.getTexts();
  }

  toPage(str: string) {
    switch (str) {
      case 'linkedIn':
        const link =
          'https://www.linkedin.com/in/%C3%B6zge-e%C5%9Fer-1599242aa/';
        window.open(link, '_blank');
        break;
      case 'twitter':
        const link2 = 'https://twitter.com/ozgisssssss';
        window.open(link2, '_blank');
        break;
      case 'instagram':
        const link3 = 'https://www.instagram.com/ozge.teacherr/';
        window.open(link3, '_blank');
        break;
      default:
        break;
    }
  }

  getTexts() {
    this.store.select(getTextByType, 3).subscribe((res) => {
      this.header = res;
    });
    this.store.select(getTextByType, 4).subscribe((res) => {
      this.boldHeader = res;
    });
    this.store.select(getTextByType, 5).subscribe((res) => {
      this.description = res;
    });
  }
}
