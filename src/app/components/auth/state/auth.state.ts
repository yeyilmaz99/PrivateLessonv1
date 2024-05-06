import { User } from "../../../models/userModel";



export interface AuthState {
    user:User | null,
    admin:boolean | null,
}

export const initialState:AuthState = {
    user:null,
    admin:null,
}