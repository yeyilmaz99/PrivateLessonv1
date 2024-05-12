import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { loadMainPhotos, updatePhoto } from '../../state/photos/photos.actions';
import { getMainPhotos } from '../../state/photos/photos.selector';
import { Photo, PhotoForUpdate } from '../../models/photoModel';
import { Observable } from 'rxjs';
import { isAdmin } from '../auth/state/auth.selector';
import { AsyncPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { updateText } from '../../state/texts/texts.actions';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent implements OnInit {
  store = inject(Store<AppState>);
  formBuilder = inject(FormBuilder);
  toastrService = inject(ToastrService)
  header: FEndText;
  projectHeader1: FEndText;
  projectDescription1: FEndText;
  projectHeader2: FEndText;
  projectDescription2: FEndText;
  photos: Photo[] = [];
  topPhoto: Photo;
  bottomPhoto: Photo;
  isAdmin: Observable<boolean>;
  updateHeaderForm: FormGroup;
  updatePortfolyoPhotoForm: FormGroup;
  updatePortfolyoPhotoForm2: FormGroup;
  ngOnInit(): void {
    this.getTexts();
    this.getMainPhotos();
    this.isAdmin = this.store.select(isAdmin);
    this.createForms();
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
  }

  createUpdateHeaderForm(){
    this.updateHeaderForm = this.formBuilder.group( {
      text:["",Validators.required]
    })
  }

  createForms(){
    this.createUpdateHeaderForm();
    this.createUpdatePortfolyoPhotoForm();
    this.createUpdatePortfolyoPhotoForm2();
  }

  updateTextString(id:number){
    if(!this.updateHeaderForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateHeaderForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateHeaderForm.reset();
    this.toastrService.success("Successfuly Updated");
  }


 createUpdatePortfolyoPhotoForm(){
  this.updatePortfolyoPhotoForm = this.formBuilder.group({
    headerText:[""],
    description:[""],
    imageData:[File]
  })
 }

 createUpdatePortfolyoPhotoForm2(){
  this.updatePortfolyoPhotoForm2 = this.formBuilder.group({
    headerText:[""],
    description:[""],
    imageData:[File]
  })
 }








  updatePortfolyoPhoto(id:number, isMain:boolean, isCertificate:boolean):void{
    if(!this.updatePortfolyoPhotoForm.valid){
      this.toastrService.error("Alanlar Boş Olamaz")
    }
    let photo: PhotoForUpdate = Object.assign({}, this.updatePortfolyoPhotoForm.value);

    const formData = new FormData();

    const blob = new Blob([photo.imageData], {type:'image/jpeg'})
    formData.append('ImageData', blob, 'image.png');
    formData.append('HeaderText', photo.headerText);
    formData.append('Description',photo.description)

    this.store.dispatch(updatePhoto({id,isMain,isCertificate,formData}));
    this.updatePortfolyoPhotoForm.reset();
    this.toastrService.success("Successfuly Updated");
    this.store.dispatch(loadMainPhotos());
  }


  onFileSelected(event: any) {
    const file = event.target.files[0]
    this.updatePortfolyoPhotoForm.patchValue({ imageData: file });
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0]
    this.updatePortfolyoPhotoForm2.patchValue({ imageData: file });
  }


  updatePortfolyoPhoto2(id:number,isMain:boolean,isCertificate:boolean){
    if(!this.updatePortfolyoPhotoForm2.valid){
      this.toastrService.error("Alanlar Boş Olmamalıdır.");
    }else{
      let photo: PhotoForUpdate = Object.assign({}, this.updatePortfolyoPhotoForm2.value);

      const formData = new FormData();
      console.log(photo.imageData);
      const blob = new Blob([photo.imageData], {type:'image/jpeg'})
      formData.append('ImageData', blob, 'image.png');
      formData.append('HeaderText', photo.headerText);
      formData.append('Description',photo.description)
      this.store.dispatch(updatePhoto({id,isMain,isCertificate,formData}));
      this.updatePortfolyoPhotoForm2.reset();
      this.toastrService.success("Successfuly Updated");
      this.store.dispatch(loadMainPhotos());
    }
  }
}
