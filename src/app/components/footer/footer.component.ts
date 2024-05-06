import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { getTextByType } from '../../state/texts/texts.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { FETextToUpdateDto, FEndText } from '../../models/textsModel';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { isAdmin } from '../auth/state/auth.selector';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { updateText } from '../../state/texts/texts.actions';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, AsyncPipe, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit {
  private store = inject(Store<AppState>);
  private toastrService = inject(ToastrService);
  private formBuilder = inject(FormBuilder)
  footerText: FEndText;
  isAdmin:Observable<boolean>;
  updateFooterTextForm:FormGroup;


  ngOnInit(): void {
    this.getTexts();
    this.isAdmin = this.store.select(isAdmin);
    this.createForms();
  }

  getTexts() {
    this.store.select(getTextByType, 22).subscribe((res) => {
      this.footerText = res;
    });
  }

  updateFooter(id:number){
    if(!this.updateFooterTextForm.valid){
      this.toastrService.error("An unexpected error occurred, Please try again");
      return;
    }
    let text: FETextToUpdateDto = Object.assign({}, this.updateFooterTextForm.value);
    this.store.dispatch(updateText({id, text}));
    this.updateFooterTextForm.reset();
    this.toastrService.success("Successfuly Updated");
  }

  createForms(){
    this.createUpdateFooterForm();
  }

  createUpdateFooterForm(){
    this.updateFooterTextForm = this.formBuilder.group({
      text:["",Validators.required]
    })
  }

  
}
