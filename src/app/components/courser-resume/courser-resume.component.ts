import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { makeItFalse, makeItTrue } from '../../state/toggle/toggle.actions';
import { getToggle } from '../../state/toggle/toggle.selector';
import { getAllExperiences } from '../../state/experiences/experiences.selector';
import { loadExperiences } from '../../state/experiences/experiences.actions';
import { Experience } from '../../models/experienceModel';
import { getAllLanguages } from '../../state/languages/languages.selector';
import { loadLanguages } from '../../state/languages/languages.actions';
import { Language } from '../../models/languageModel';
import { Skill } from '../../models/skillModel';
import { Education } from '../../models/educationModel';
import { getAllEducations } from '../../state/educations/educations.selector';
import { loadEducations } from '../../state/educations/educations.actions';
import { getAllSkills } from '../../state/skills/skills.selector';
import { loadSkills } from '../../state/skills/skills.actions';

@Component({
  selector: 'app-courser-resume',
  standalone: true,
  imports: [],
  templateUrl: './courser-resume.component.html',
  styleUrl: './courser-resume.component.css',
})
export class CourserResumeComponent implements OnInit {
  private store = inject(Store<AppState>);
  show: boolean = false;
  experiences: Experience[] = [];
  languages: Language[] = [];
  skills: Skill[] = [];
  educations: Education[] = [];

  constructor() {
    this.store.select(getToggle).subscribe((r) => {
      this.show = r;
    });
  }
  ngOnInit(): void {
    this.getExperiences();
    this.getEducations();
    this.getLanguages();
    this.getSkills();
  }

  toggle() {
    this.store.select(getToggle).subscribe((r) => {
      this.show = r;
    });
    if (this.show == false) {
      this.store.dispatch(makeItTrue());
    } else {
      this.store.dispatch(makeItFalse());
      this.scrolToTop();
    }
  }

  download() {
    const link =
      'https://res.cloudinary.com/dncoekpe8/image/upload/v1711304355/%C3%96ZGE_E%C5%9EER_CV_rzqebk.pdf';
    window.open(link, '_blank');
  }

  getExperiences() {
    this.store.select(getAllExperiences).subscribe((resp) => {
      this.experiences = resp;
      if (resp.length <= 0) {
        this.store.dispatch(loadExperiences());
        this.store.select(getAllExperiences).subscribe((resp) => {
          this.experiences = resp;
        });
      }
    });
  }

  getLanguages() {
    this.store.select(getAllLanguages).subscribe((resp) => {
      this.languages = resp;
      if (resp.length <= 0) {
        this.store.dispatch(loadLanguages());
        this.store.select(getAllLanguages).subscribe((resp) => {
          this.languages = resp;
        });
      }
    });
  }

  getEducations() {
    this.store.select(getAllEducations).subscribe((resp) => {
      this.educations = resp;
      if (resp.length <= 0) {
        this.store.dispatch(loadEducations());
        this.store.select(getAllEducations).subscribe((resp) => {
          this.educations = resp;
        });
      }
    });
  }

  getSkills() {
    this.store.select(getAllSkills).subscribe((resp) => {
      this.skills = resp;
      if (resp.length <= 0) {
        this.store.dispatch(loadSkills());
        this.store.select(getAllSkills).subscribe((resp) => {
          this.skills = resp;
        });
      }
    });
  }

  scrolToTop() {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
