import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { CourseScheduleComponent } from '../course-schedule/course-schedule.component';
import { FEndText } from '../../models/textsModel';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/reducers';
import { getTextByType } from '../../state/texts/texts.selector';
import { Applicant } from '../../models/applicantModel';
import { getAllApplicants } from '../../state/applicants/applicants.selector';
import { elementAt } from 'rxjs';

@Component({
  selector: 'app-apply-course',
  standalone: true,
  imports: [CommonModule, HeaderComponent, CourseScheduleComponent],
  templateUrl: './apply-course.component.html',
  styleUrl: './apply-course.component.css',
})
export class ApplyCourseComponent {
  days: string[] = [];
  timeSlots: any[] = [];
  store = inject(Store<AppState>);
  contactHeader: FEndText;
  contactText: FEndText;
  contactMailHeader: FEndText;
  contactMailText: FEndText;

  applicants: Applicant[] = [];

  constructor() {}

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
  }

  selectedTimes: string[] = [];
  selectedTimes1: dayAndHour[] = [];
  selectedButton: any = {};

  buttonClick(time: string, day: string) {
    let dh: dayAndHour = { hour: time, day: day };
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
}
interface dayAndHour {
  day: string;
  hour: string;
}
