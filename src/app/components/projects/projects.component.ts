import { Component, OnInit, inject } from '@angular/core';
import { FeatureConfig, Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { FEndText } from '../../models/textsModel';
import { getTextByType } from '../../state/texts/texts.selector';
import { loadMainPhotos, loadPhotos } from '../../state/photos/photos.actions';
import {
  getAllPhotos,
  getMainPhotos,
} from '../../state/photos/photos.selector';
import { Photo } from '../../models/photoModel';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  store = inject(Store<AppState>);

  header: FEndText;
  headerBoldText: FEndText;
  headerDescription: FEndText;
  headerItalicText: FEndText;
  photos: Photo[] = [];

  ngOnInit(): void {
    this.getTexts();
    this.getPhotos();
  }

  getPhotos() {
    this.store.select(getAllPhotos).subscribe((resp) => {
      this.photos = resp;
    });

    if (this.photos.length < 3) {
      this.store.dispatch(loadPhotos());
      this.store.select(getAllPhotos).subscribe((resp) => {
        this.photos = resp;
      });
    }
  }

  getTexts() {
    this.store.select(getTextByType, 8).subscribe((res) => {
      this.header = res;
    });
    this.store.select(getTextByType, 9).subscribe((res) => {
      this.headerBoldText = res;
    });
    this.store.select(getTextByType, 10).subscribe((res) => {
      this.headerDescription = res;
    });
    this.store.select(getTextByType, 11).subscribe((res) => {
      this.headerItalicText = res;
    });
  }
}
