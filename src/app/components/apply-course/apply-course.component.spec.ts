import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyCourseComponent } from './apply-course.component';

describe('ApplyCourseComponent', () => {
  let component: ApplyCourseComponent;
  let fixture: ComponentFixture<ApplyCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplyCourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplyCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
