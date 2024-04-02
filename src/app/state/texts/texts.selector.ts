import { createFeatureSelector, createSelector } from "@ngrx/store";
import { TextsState } from "./texts.state";
import { FEndText } from "../../models/textsModel";

export const TEXTS_STATE_NAME = 'textsState';

const getTextsState = createFeatureSelector<TextsState>(TEXTS_STATE_NAME);

export const getTexts = createSelector(getTextsState,(state) => {
    return state.texts;
})

export const getTextByType = createSelector(getTexts,(texts:FEndText[], type:number) => {
    return texts ? texts.find((text:FEndText) => text.type === type) : null;
})