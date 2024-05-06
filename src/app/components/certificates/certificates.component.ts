import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { loadCertificates } from '../../state/photos/photos.actions';
import { getCertificates } from '../../state/photos/photos.selector';
import { Photo } from '../../models/photoModel';
import { isAdmin } from '../auth/state/auth.selector';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { updateText } from '../../state/texts/texts.actions';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css',
})
export class CertificatesComponent {
  store = inject(Store<AppState>);
  toastrService = inject(ToastrService);
  formBuilder = inject(FormBuilder);
  header: FEndText;
  headerBoldText: FEndText;
  headerDescription: FEndText;
  certificates: Photo[] = [];
  certificatesLoaded: boolean = false;
  isAdmin:Observable<boolean>;

  headerTextUpdateForm:FormGroup;
  headerBoldTextUpdateForm:FormGroup;
  headerDescriptionUpdateForm:FormGroup;
  constructor() {}

  ngOnInit() {
    this.getTexts();
    this.loadCertificates();
    this.isAdmin = this.store.select(isAdmin);
    this.createForms();
  }


  loadCertificates() {
    this.store.select(getCertificates).subscribe((resp) => {
      this.certificates = resp;
    });

    if (this.certificates.length == 0) {
      this.store.dispatch(loadCertificates());

      this.store.select(getCertificates).subscribe((resp) => {
        this.certificates = resp;
      });
    }
  }

  getTexts() {
    this.store.select(getTextByType, 12).subscribe((res) => {
      this.header = res;
    });
    this.store.select(getTextByType, 13).subscribe((res) => {
      this.headerBoldText = res;
    });
    this.store.select(getTextByType, 14).subscribe((res) => {
      this.headerDescription = res;
    });
  }

  updateHeader(id:number){
    if(!this.headerTextUpdateForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.headerTextUpdateForm.value);
    this.store.dispatch(updateText({id, text}));
    this.headerTextUpdateForm.reset();
    this.toastrService.success("Successfuly Updated");
  }
  updateBoldText(id:number){
    if(!this.headerBoldTextUpdateForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.headerBoldTextUpdateForm.value);
    this.store.dispatch(updateText({id, text}));
    this.headerBoldTextUpdateForm.reset();
    this.toastrService.success("Successfuly Updated");
  }
  updateDescription(id:number){
    if(!this.headerDescriptionUpdateForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.headerDescriptionUpdateForm.value);
    this.store.dispatch(updateText({id, text}));
    this.headerDescriptionUpdateForm.reset();
    this.toastrService.success("Successfuly Updated");
  }


  createForms(){
    this.createBoldTextUpdateForm();
    this.createDescriptionUpdateForm();
    this.createHeaderUpdateForm();
  }

  createHeaderUpdateForm(){
    this.headerTextUpdateForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }
  createBoldTextUpdateForm(){
    this.headerBoldTextUpdateForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }
  createDescriptionUpdateForm(){
    this.headerDescriptionUpdateForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }
}
