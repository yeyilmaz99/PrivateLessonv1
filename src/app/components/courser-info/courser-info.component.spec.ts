import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourserInfoComponent } from './courser-info.component';

describe('CourserInfoComponent', () => {
  let component: CourserInfoComponent;
  let fixture: ComponentFixture<CourserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
