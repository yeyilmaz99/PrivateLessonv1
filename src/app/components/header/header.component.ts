import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { Observable } from 'rxjs';
import { makeItFalse, makeItTrue } from '../../state/toggle/toggle.actions';
import { Router, RouterLink } from '@angular/router';
import { getToggle } from '../../state/toggle/toggle.selector';
import { getTextByType } from '../../state/texts/texts.selector';
import { FEndText } from '../../models/textsModel';
import { loadMainPhotos } from '../../state/photos/photos.actions';
import { Photo } from '../../models/photoModel';
import { getMainPhotos } from '../../state/photos/photos.selector';
import { getAllExperiences } from '../../state/experiences/experiences.selector';
import { Experience } from '../../models/experienceModel';
import { loadExperiences } from '../../state/experiences/experiences.actions';
import { getAllEducations } from '../../state/educations/educations.selector';
import { loadEducations } from '../../state/educations/educations.actions';
import { getAllSkills } from '../../state/skills/skills.selector';
import { loadSkills } from '../../state/skills/skills.actions';
import { getAllLanguages } from '../../state/languages/languages.selector';
import { loadLanguages } from '../../state/languages/languages.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  show: boolean = false;
  title: string = 'CV Görüntüle';
  header: FEndText;
  coloredHeader: FEndText;

  photos: Photo[] = [];

  topPhoto: Photo;

  isHomePage: boolean = false;

  ngOnInit(): void {
    this.store.select(getToggle).subscribe((r) => {
      if (r) {
        this.title = 'CV Gizle';
      } else {
        this.title = 'CV Görüntüle';
      }
      this.show = r;
    });

    if (this.router.url.includes('courserInfo')) {
      this.isHomePage = true;
    } else {
      this.isHomePage = false;
    }

    this.getTexts();
    this.getMainPhotos();
    this.getExperiences();
    this.getEducations();
    this.getSkills();
    this.getLanguages();
  }
  constructor() {}

  getMainPhotos() {
    this.store.select(getMainPhotos).subscribe((resp) => {
      this.photos = resp;
      this.photos.forEach((photo) => {
        if (photo.position == 1) {
          this.topPhoto = photo;
        }
      });
    });

    if (this.photos.length < 3) {
      this.store.dispatch(loadMainPhotos());
      this.store.select(getMainPhotos).subscribe((resp) => {
        this.photos = resp;
        this.photos.forEach((photo) => {
          if (photo.position == 1) {
            this.topPhoto = photo;
          }
        });
      });
    }
  }

  getEducations() {
    this.store.select(getAllEducations).subscribe((resp) => {
      if (resp.length <= 0) {
        this.store.dispatch(loadEducations());
      }
    });
  }

  getSkills() {
    this.store.select(getAllSkills).subscribe((resp) => {
      if (resp.length <= 0) {
        this.store.dispatch(loadSkills());
      }
    });
  }

  getLanguages() {
    this.store.select(getAllLanguages).subscribe((resp) => {
      if (resp.length <= 0) {
        this.store.dispatch(loadLanguages());
      }
    });
  }

  getExperiences() {
    this.store.select(getAllExperiences).subscribe((resp) => {
      if (resp.length <= 0) {
        this.store.dispatch(loadExperiences());
      }
    });
  }

  getTexts() {
    this.store.select(getTextByType, 1).subscribe((res) => {
      this.header = res;
    });
    this.store.select(getTextByType, 2).subscribe((res) => {
      this.coloredHeader = res;
    });
  }

  toggle() {
    if (this.show == false) {
      this.store.dispatch(makeItTrue());
    } else {
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
