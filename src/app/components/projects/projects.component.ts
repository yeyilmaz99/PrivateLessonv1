import { Component, OnInit, inject } from '@angular/core';
import { FeatureConfig, Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { getTextByType } from '../../state/texts/texts.selector';
import { loadMainPhotos, loadPhotos } from '../../state/photos/photos.actions';
import {
  getAllPhotos,
  getMainPhotos,
} from '../../state/photos/photos.selector';
import { Photo } from '../../models/photoModel';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { isAdmin } from '../auth/state/auth.selector';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateText } from '../../state/texts/texts.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent implements OnInit {
  store = inject(Store<AppState>);
  formBuilder=inject(FormBuilder);
  toastrService = inject(ToastrService)
  header: FEndText;
  headerBoldText: FEndText;
  headerDescription: FEndText;
  headerItalicText: FEndText;
  photos: Photo[] = [];
  editPhoto:Photo;
  isAdmin:Observable<boolean>;
  updateDescriptionForm:FormGroup;
  updateBoldTextForm:FormGroup;
  updateHeaderForm:FormGroup;
  updateItalicTextForm:FormGroup;


  ngOnInit(): void {
    this.getTexts();
    this.getPhotos();
    this.isAdmin = this.store.select(isAdmin);
    this.createForms();
  }


  editPhotoModal(photo:Photo){
    this.editPhoto = photo
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



  createForms(){
    this.createBoldTextUpdateForm();
    this.createDescriptionTextUpdateForm();
    this.createHeaderUpdateForm();
    this.createItalicTextUpdateForm();
  }

  createHeaderUpdateForm(){
    this.updateHeaderForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }

  createBoldTextUpdateForm(){
    this.updateBoldTextForm = this.formBuilder.group({
      text:["", Validators.required]
    })
  }

  createDescriptionTextUpdateForm(){
    this.updateDescriptionForm = this.formBuilder.group({
      text:["", Validators.required]
    })
  }

  createItalicTextUpdateForm(){
    this.updateItalicTextForm = this.formBuilder.group({
      text:["", Validators.required]
    })
  }


  updateHeaderText(id:number){
    if(!this.updateHeaderForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateHeaderForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateHeaderForm.reset();
    this.toastrService.success("Successfuly Updated");
  }

  updateBoldText(id:number){
    if(!this.updateBoldTextForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateBoldTextForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateBoldTextForm.reset();
    this.toastrService.success("Successfuly Updated");
  }
  updateDescription(id:number){
    if(!this.updateDescriptionForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateDescriptionForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateDescriptionForm.reset();
    this.toastrService.success("Successfuly Updated");
  }

  updateItalicText(id:number){
    if(!this.updateItalicTextForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateItalicTextForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateItalicTextForm.reset();
    this.toastrService.success("Successfuly Updated");
  }



}
