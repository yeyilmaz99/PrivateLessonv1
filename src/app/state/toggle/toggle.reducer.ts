import { createReducer, on } from "@ngrx/store";
import { makeItFalse,makeItTrue } from "./toggle.actions";
import { initialState } from "./toggle.state";



export const toggleReducer = createReducer(initialState,
    on(makeItFalse,(state) => {
        return{
            toggle: false
        }
    }),
    on(makeItTrue,(state) => {
        return{
            toggle:true
        }
    })
    )