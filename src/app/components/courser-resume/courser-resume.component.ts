import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { makeItFalse, makeItTrue } from '../../state/toggle/toggle.actions';
import { getToggle } from '../../state/toggle/toggle.selector';
import { getAllExperiences } from '../../state/experiences/experiences.selector';
import { loadExperiences, updateExperience } from '../../state/experiences/experiences.actions';
import { Experience } from '../../models/experienceModel';
import { getAllLanguages } from '../../state/languages/languages.selector';
import { loadLanguages } from '../../state/languages/languages.actions';
import { Language } from '../../models/languageModel';
import { Skill } from '../../models/skillModel';
import { Education } from '../../models/educationModel';
import { getAllEducations } from '../../state/educations/educations.selector';
import { loadEducations, updateEducation } from '../../state/educations/educations.actions';
import { getAllSkills } from '../../state/skills/skills.selector';
import { loadSkills } from '../../state/skills/skills.actions';
import { Observable } from 'rxjs';
import { isAdmin } from '../auth/state/auth.selector';
import { AsyncPipe } from '@angular/common';
import { EducationService } from '../../services/educationService/education.service';
import { ofType } from '@ngrx/effects';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EducationForUpdate } from '../../models/educationForUpdate';
import { ExperienceForUpdate } from '../../models/experienceForUpdateDto';

@Component({
  selector: 'app-courser-resume',
  standalone: true,
  imports: [AsyncPipe,ReactiveFormsModule],
  templateUrl: './courser-resume.component.html',
  styleUrl: './courser-resume.component.css',
})
export class CourserResumeComponent implements OnInit {
  private store = inject(Store<AppState>);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService)
  show: boolean = false;
  experiences: Experience[] = [];
  languages: Language[] = [];
  skills: Skill[] = [];
  educations: Education[] = [];
  editExperience: Experience;
  editEducation:Education;
  editSkill:Skill;
  editLanguage:Language;
  isAdmin:Observable<boolean>;

  updateSkillsForm:FormGroup;
  updateLanguageForm:FormGroup;
  updateEducationForm:FormGroup;
  updateExperienceForm:FormGroup;
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
    this.isAdmin = this.store.select(isAdmin);
    this.createForms()
  }

  openLanguageEditModal(language:Language){
    this.editLanguage = language
  }
  openSkillEditModal(skill:Skill){
    this.editSkill = skill
  }

  openEducationEditModal(education: Education) {
    this.editEducation = education;
  }

  openExperienceEditModal(experience: Experience) {
    this.editExperience = experience;
  }

  logla(input: any) {
    console.log(input)
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

  updateEducation(id:number){
    if(!this.updateEducationForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let education: EducationForUpdate = Object.assign({}, this.updateEducationForm.value);
    this.store.dispatch(updateEducation({id, education}));
    this.updateEducationForm.reset();
    this.toastrService.success("Successfuly Updated");
  }

  createEducationUpdateForm(){
    this.updateEducationForm = this.formBuilder.group({
      startDate:[""],
      endDate:[""],
      school:[""],
      department:[""],
      degree:[""],
      description:[""],
      type:[""]
    })
  }

  createExperienceUpdateForm(){
    this.updateExperienceForm = this.formBuilder.group({
      startDate:[""],
      endDate:[""],
      title:[""],
      company:[""],
      city:[""],
      description:[""]
    })
  }

  updateExperience(id:number){
    if(!this.updateExperienceForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let experience: ExperienceForUpdate = Object.assign({}, this.updateExperienceForm.value);
    this.store.dispatch(updateExperience({id, experience}));
    this.updateExperienceForm.reset();
    this.toastrService.success("Successfuly Updated");
  }


  createForms(){
    this.createEducationUpdateForm();
    this.createExperienceUpdateForm();
  }


  scrolToTop() {
    document.body.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
