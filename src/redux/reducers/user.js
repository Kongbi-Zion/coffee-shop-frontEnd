import { ADD_USER } from "../constants/action-types"

const initState = {
    user: {}
}

export const userReducer = (state=initState, action) =>{
    switch(action.type){
        case ADD_USER:
            return {
                user: action.payload
            }
        default: 
            return state
    }
}

 