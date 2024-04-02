import { FEndText } from "../../models/textsModel";


export interface TextsState {
    texts:FEndText[];
}

export const initialState:TextsState = {
    texts: []
}