import { ADD_USER } from "../constants/action-types"

/**
 * @param userData
 * @return object
 */
export const addUser = (userData) => {
    return {type: ADD_USER, payload: userData}
}
