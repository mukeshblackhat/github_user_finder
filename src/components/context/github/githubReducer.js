import {
    SEARCH_USERS,
    GET_USER,
    CLEAR_USERS,
    GET_REPOS,
    SET_LOADING,
    } from '../types';

// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
 switch (action.type) {
    case GET_USER:
        return{
        ...state,
        user:action.payload,
        loading:false
        };
    case SEARCH_USERS:
        return{
         ...state,
         users:action.payload,
         loading:false
        };
    case SET_LOADING:
        return{
            ...state,
            loading:true
        };
    default:
        return state;
}
}