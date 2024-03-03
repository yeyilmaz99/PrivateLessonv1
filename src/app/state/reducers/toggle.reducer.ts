import { createReducer, on } from "@ngrx/store";
import { makeItFalse,makeItTrue } from "./toggle.actions";

export const initialState = false;
export const toggleReducer = createReducer(initialState,
    on(makeItFalse,(state) => state = false),
    on(makeItTrue,(state) => state = true)
    )