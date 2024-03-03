import { ExtraOptions, Routes } from '@angular/router';
import { CourserInfoComponent } from './components/courser-info/courser-info.component';
import { CourserResumeComponent } from './components/courser-resume/courser-resume.component';
import { ApplyCourseComponent } from './components/apply-course/apply-course.component';
export const extraOptions: ExtraOptions = {scrollPositionRestoration:'enabled', anchorScrolling:'enabled' }
export const routes: Routes = [
    {path:"", pathMatch:"full", redirectTo:"courserInfo"},
    {path:"courserInfo", component:CourserInfoComponent},
    {path:"courserResume", component:CourserResumeComponent},
    {path:"applyCourse", component:ApplyCourseComponent}
  ];