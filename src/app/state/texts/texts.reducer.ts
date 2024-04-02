import { createReducer, on } from "@ngrx/store";
import { initialState } from "./texts.state";
import { loadTextsSucces } from "./texts.actions";

const _textsReducer = createReducer(initialState,
    on(loadTextsSucces,(state,action)=> {
        return {
            ...state,
            texts: action.texts
        }
    }))

    export function textsReducer(state:any,action:any){
        return _textsReducer(state,action);
    }