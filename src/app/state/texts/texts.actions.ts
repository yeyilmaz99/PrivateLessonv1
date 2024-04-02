import { createAction, props } from "@ngrx/store";
import { FEndText } from "../../models/textsModel";

// export const makeItTrue = createAction('[Toggle] True')
// export const makeItFalse = createAction('[Toggle] False')

export const LOAD_TEXTS = '[Texts] GetTexts';
export const LOAD_TEXTS_SUCCESS = '[Texts] GetTexts Success';


export const loadTexts = createAction(LOAD_TEXTS);
export const loadTextsSucces = createAction(LOAD_TEXTS_SUCCESS, props<{texts:FEndText[]}>());

