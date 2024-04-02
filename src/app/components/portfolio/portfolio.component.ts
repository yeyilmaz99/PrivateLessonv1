import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { FEndText } from '../../models/textsModel';
import { loadMainPhotos } from '../../state/photos/photos.actions';
import { getMainPhotos } from '../../state/photos/photos.selector';
import { Photo } from '../../models/photoModel';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  store = inject(Store<AppState>);
  header: FEndText;
  projectHeader1: FEndText;
  projectDescription1: FEndText;
  projectHeader2: FEndText;
  projectDescription2: FEndText;
  photos: Photo[] = [];
  topPhoto: Photo;
  bottomPhoto: Photo;

  ngOnInit(): void {
    this.getTexts();
    this.getMainPhotos();
  }

  getMainPhotos() {
    this.store.select(getMainPhotos).subscribe((resp) => {
      this.photos = resp;
      this.photos.forEach((photo) => {
        if (photo.position == 2) {
          this.topPhoto = photo;
        } else if (photo.position == 3) {
          this.bottomPhoto = photo;
        }
      });
    });
  }

  getTexts() {
    this.store.select(getTextByType, 21).subscribe((res) => {
      this.header = res;
    });
    this.store.select(getTextByType, 6).subscribe((res) => {
      this.projectHeader1 = res;
    });
    this.store.select(getTextByType, 19).subscribe((res) => {
      this.projectDescription1 = res;
    });
    this.store.select(getTextByType, 7).subscribe((res) => {
      this.projectHeader2 = res;
    });
    this.store.select(getTextByType, 20).subscribe((res) => {
      this.projectDescription2 = res;
    });
  }
}
