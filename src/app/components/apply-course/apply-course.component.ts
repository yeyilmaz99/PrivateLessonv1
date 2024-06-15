import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CourseScheduleComponent } from '../course-schedule/course-schedule.component';
import { FEndText } from '../../models/textsModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { Applicant, MailDto } from '../../models/applicantModel';
import { getAllApplicants } from '../../state/applicants/applicants.selector';
import { elementAt } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, MaxLengthValidator, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApplicantService } from '../../services/applicantService/applicant.service';

@Component({
  selector: 'app-apply-course',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CourseScheduleComponent,ReactiveFormsModule],
  templateUrl: './apply-course.component.html',
  styleUrl: './apply-course.component.css',
})
export class ApplyCourseComponent {
  private formBuilder = inject(FormBuilder);
  private applicantService = inject(ApplicantService)
  days: string[] = [];
  timeSlots: any[] = [];
  store = inject(Store<AppState>);
  contactHeader: FEndText;
  contactText: FEndText;
  contactMailHeader: FEndText;
  contactMailText: FEndText;
  applicants: Applicant[] = [];
  
  applyForm:FormGroup;
  applyId:number = 0;
  constructor() {
  }

  ngOnInit(): void {
    this.days = [
      'Pazartesi',
      'Salı',
      'Çarşamba',
      'Perşembe',
      'Cuma',
      'Cumartesi',
    ];
    this.timeSlots = [
      { time: '17:00' },
      { time: '18:00' },
      { time: '19:00' },
      { time: '20:00' },
      { time: '21:00' },
      { time: '22:00' },
    ];

    this.getTexts();
    this.getApplicants();
    this.createApplyCourseForm();

  }

  selectedTimes: string[] = [];
  selectedTimes1: dayAndHour[] = [];
  selectedButton: any = {};
  errorReport: boolean = false;
  daysNHoursError: boolean =false;

  buttonClick(time: string, day: string) {
    this.applyId = this.applyId+1;
    let dh: dayAndHour = { id:this.applyId, hour: time, day: day };
    let found = this.selectedTimes1.find(
      (item) => item.hour === time && item.day === day
    );
    var bool = found !== undefined;
    if (bool) {
      const index = this.selectedTimes1.indexOf(found);
      this.selectedTimes1.splice(index, 1);
    } else {
      this.selectedTimes1.push(dh);
    }
  }

  isSelected(time: string, day: string): boolean {
    let found = this.selectedTimes1.find(
      (item) => item.hour === time && item.day === day
    );
    return found !== undefined;
  }

  isAlreadySelected(time: string, day: string): boolean {
    let found = this.alreadySelectedTimes.find(
      (item) => item.hour === time && item.day === day
    );
    return found !== undefined;
  }
  alreadySelectedTimes: dayAndHour[] = [];
  getApplicants() {
    this.store.select(getAllApplicants).subscribe((resp) => {
      this.applicants = resp;
      for (let i = 0; i < this.applicants.length; i++) {
        const element = this.applicants[i];
        for (let j = 0; j < element.daysnHours.length; j++) {
          let dh: dayAndHour = { hour: '', day: '' };
          dh.hour = element.daysnHours[j].hour;
          dh.day = this.getNumber(element.daysnHours[j].day);
          this.alreadySelectedTimes.push(dh);
        }
      }
    });
  }

  getTexts() {
    this.store.select(getTextByType, 15).subscribe((res) => {
      this.contactHeader = res;
    });
    this.store.select(getTextByType, 16).subscribe((res) => {
      this.contactText = res;
    });
    this.store.select(getTextByType, 17).subscribe((res) => {
      this.contactMailHeader = res;
    });
    this.store.select(getTextByType, 18).subscribe((res) => {
      this.contactMailText = res;
    });
  }

  getNumber(day: number): string {
    switch (day) {
      case 1:
        return 'Pazartesi';
        break;
      case 2:
        return 'Salı';
        break;
      case 3:
        return 'Çarşamba';
        break;
      case 4:
        return 'Perşembe';
        break;
      case 5:
        return 'Cuma';
        break;
      case 6:
        return 'Cumartesi';
        break;
      default:
        return '';
        break;
    }
  }


  createApplyCourseForm(){
    this.applyForm =  this.formBuilder.group({
      mailText:["",Validators.required],
      toMail:["",[Validators.required,Validators.email]],
      toName:["",Validators.required],
      toSurname:["",Validators.required],
      kidName:["",Validators.required],
      kidAge:[,Validators.required],
      toPhone:['',[Validators.required,Validators.pattern('^(\\+90)|0[0-9]{10}$')]],
    })
  }

  ApplyCourse(){
    if(this.applyForm.valid){
      this.errorReport = false;
      const daysnHoursControl = new FormControl(this.selectedTimes1);
      this.applyForm.addControl('daysnHours',daysnHoursControl)
      if(this.selectedTimes1.length >0){
        this.daysNHoursError = false;
        console.log(this.selectedTimes1.length);
        let applicant: MailDto = Object.assign({}, this.applyForm.value);
        this.applicantService.setApplicant(applicant).subscribe(r => {
          console.log("başarılı");
          this.getApplicants();
          r.message;
        })
      }else{
        this.daysNHoursError = true;
      }

    }else{
      this.errorReport = true
      console.log(this.applyForm)
    }

  }


  showErrors(controlName:string){
    const control = this.applyForm.get(controlName);
    if(control.touched && !control.valid){
      if(control.errors['required']){
        return 'Bu alan zorunludur';
      }
      return null;  
    }
    return null;
  }


  
  showPhoneErrors(){
    const control = this.applyForm.get('toPhone');
    if (control.touched && !control.valid) {
      if (control.errors['pattern']) {
        return 'Lütfen Telefon Numaranızı Doğru Giriniz! 05555555555 şeklinde olmalıdır.';
      }
    }
    return null;
  }


  showEmailErrors(){
    const control = this.applyForm.get('toMail');
    if (control.touched && !control.valid) {
      if (control.errors['email']) {
        return 'Email doğru girilmelidir!';
      }
    }
    return null;
  }
  }

  
  
  


interface dayAndHour {
  id?:number;
  day: string;
  hour: string;
}
