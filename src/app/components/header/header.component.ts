import { Component, OnInit, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { Observable } from 'rxjs';
import { makeItFalse, makeItTrue } from '../../state/toggle/toggle.actions';
import { Router, RouterLink } from '@angular/router';
import { getToggle } from '../../state/toggle/toggle.selector';
import { getTextByType } from '../../state/texts/texts.selector';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { loadMainPhotos, updatePhoto } from '../../state/photos/photos.actions';
import { Photo, PhotoForUpdate } from '../../models/photoModel';
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
import { isAdmin } from '../auth/state/auth.selector';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateText } from '../../state/texts/texts.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  private store = inject(Store<AppState>);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder)
  private toastrService = inject(ToastrService)
  show: boolean = false;
  title: string = 'CV Görüntüle';
  header: FEndText;
  coloredHeader: FEndText;
  isAdmin:boolean;

  updateTopTextForm:FormGroup;

  photos: Photo[] = [];

  topPhoto: Photo;

  isHomePage: boolean = false;

  updateBottomTextForm:FormGroup;
  updatePhotoForm:FormGroup;

  ngOnInit(): void {
    this.store.select(getToggle).subscribe((r) => {
      if (r) {
        this.title = 'CV Gizle';
      } else {
        this.title = 'CV Görüntüle';
      }
      this.show = r;
    });
    this.store.select(isAdmin).subscribe(r => {
      this.isAdmin = r
    })
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
    this.createUpdateTopTextForm();
    this.createUpdateBottomTextForm();
    this.createUpdatePhotoForm();
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

  updatePhoto(id:number){
    if(!this.updatePhotoForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let photo: PhotoForUpdate = Object.assign({}, this.updatePhotoForm.value);

    const formData = new FormData();

    const blob = new Blob([photo.imageData], {type:'image/jpeg'})
    formData.append('ImageData', blob, 'image.png');
    this.store.dispatch(updatePhoto({id, formData}));
    this.updatePhotoForm.reset();
    this.toastrService.success("Successfuly Updated");
    this.store.dispatch(loadMainPhotos());
  }

  onFileSelected(event: any) {
    const file = event.target.files[0]
    this.updatePhotoForm.patchValue({ imageData: file });
  }

  createUpdatePhotoForm(){
    this.updatePhotoForm = this.formBuilder.group({
      imageData:[File,Validators.required]
    })
  }

  createUpdateTopTextForm(){
    this.updateTopTextForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }
  createUpdateBottomTextForm(){
    this.updateBottomTextForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }

  updateTopTextString(id:number){
    if(!this.updateTopTextForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateTopTextForm.value);
    console.log(text);
  
    this.store.dispatch(updateText({id, text}));
    this.updateTopTextForm.reset();
    this.toastrService.success("Successfuly Updated");
  }

  updateBottomTextString(id:number){
    if(!this.updateBottomTextForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateBottomTextForm.value);
    console.log(text);
  
    this.store.dispatch(updateText({id, text}));
    this.updateTopTextForm.reset();
    this.toastrService.success("Successfuly Updated");
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
