import { Component, OnInit, inject } from '@angular/core';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { Observable } from 'rxjs';
import { isAdmin } from '../auth/state/auth.selector';
import { AsyncPipe } from '@angular/common';
import { Form, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateText } from '../../state/texts/texts.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements OnInit {
  private store = inject(Store<AppState>);
  private formBuilder = inject(FormBuilder);
  private toastrService = inject(ToastrService)
  header: FEndText;
  boldHeader: FEndText;
  description: FEndText;
  isAdmin:Observable<boolean>;
  updateHeaderForm:FormGroup;
  updateBoldHeaderForm:FormGroup;
  updateDescriptionForm:FormGroup;

  ngOnInit(): void {
    this.getTexts();
    this.isAdmin = this.store.select(isAdmin);
    this.createForms();
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

  createForms(){
    this.createUpdateBoldHeaderForm();
    this.createUpdateHeaderForm();
    this.createUpdateDescriptionForm();
  }


  createUpdateHeaderForm(){
    this.updateHeaderForm = this.formBuilder.group({
      text:["", Validators.required]
    })
  }
  createUpdateBoldHeaderForm(){
    this.updateBoldHeaderForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }
  createUpdateDescriptionForm(){
    this.updateDescriptionForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }

  updateHeader(id:number){
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
    if(!this.updateBoldHeaderForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateBoldHeaderForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateBoldHeaderForm.reset();
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
