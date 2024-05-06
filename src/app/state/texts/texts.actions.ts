import { createAction, props } from "@ngrx/store";
import { FETextToUpdateDto, FEndText } from "../../models/textsModel";

// export const makeItTrue = createAction('[Toggle] True')
// export const makeItFalse = createAction('[Toggle] False')

export const LOAD_TEXTS = '[Texts] GetTexts';
export const LOAD_TEXTS_SUCCESS = '[Texts] GetTexts Success';

export const UPDATE_TEXT = '[Texts] Update Text';
export const UPDATE_TEXT_SUCCESS ='[Texts] Update Text Success';


export const updateText = createAction(UPDATE_TEXT, props<{id:number,text:FETextToUpdateDto}>())
export const updateTextSuccess = createAction(UPDATE_TEXT_SUCCESS);

export const loadTexts = createAction(LOAD_TEXTS);
export const loadTextsSucces = createAction(LOAD_TEXTS_SUCCESS, props<{texts:FEndText[]}>());

