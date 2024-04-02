import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LanguageService } from '../../services/languageService/language.service';
import { loadLanguages, loadLanguagesSuccess } from './languages.actions';
import { map, mergeMap } from 'rxjs';

@Injectable()
export class LanguagesEffects {
  constructor(
    private actions$: Actions,
    private languageService: LanguageService
  ) {}

  loadLanguages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadLanguages),
      mergeMap((action) => {
        return this.languageService.getLanguages().pipe(
          map((response) => {
            const message = response.message;
            const languages = response.data;
            return loadLanguagesSuccess({ languages });
          })
        );
      })
    );
  });
}
