import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { TextsService } from "../../services/textService/texts.service";
import { Store } from "@ngrx/store";
import { AppState } from "../reducers";
import { Router } from "@angular/router";
import { loadTexts, loadTextsSucces, updateText, updateTextSuccess } from "./texts.actions";
import { map, mergeMap, of } from "rxjs";

@Injectable()

export class TextEffects{
    constructor(private actions$: Actions, private store: Store<AppState>, private router: Router, private textsService:TextsService) { }

    loadBrands$ = createEffect(() => {
        return this.actions$.pipe(ofType(loadTexts), mergeMap((action) => {
            // this.store.dispatch(setLoadingSpinner({status:true , from:"load brands"}))
            return this.textsService.getTexts().pipe(map((response) => {
                // this.store.dispatch(setLoadingSpinner({ status: false, from:"load brands success" }))
                const texts = response.data
                return loadTextsSucces({ texts })
            }))
        }))
    })


    updateText$ = createEffect(() => {
        return this.actions$.pipe(ofType(updateText), mergeMap((action) => {
            // this.store.dispatch(setLoadingSpinner({status:true, from:"update brand"}))
          return this.textsService.updateTexts(action.id, action.text).pipe(mergeMap((data) => {
            console.log("Effects içi"+action.id, action.text)
            const updateTextSuccessAction = updateTextSuccess();
            // this.store.dispatch(setLoadingSpinner({status:false, from:"update brand success"}))
            return of(updateTextSuccessAction, loadTexts());
          }))
        }))
      })

}