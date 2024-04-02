import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ToggleState } from "./toggle.state";

export const TOGGLE_STATE_NAME = "toggleState";

const getToggleState = createFeatureSelector<ToggleState>(TOGGLE_STATE_NAME);

export const getToggle = createSelector(getToggleState, (state) => {
    return state.toggle
})