import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppliedCourseSuccessComponent } from './applied-course-success.component';

describe('AppliedCourseSuccessComponent', () => {
  let component: AppliedCourseSuccessComponent;
  let fixture: ComponentFixture<AppliedCourseSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppliedCourseSuccessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppliedCourseSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
