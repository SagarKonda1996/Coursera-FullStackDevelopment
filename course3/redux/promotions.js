import * as ActionTypes from './ActionTypes'
export const promotions=(
    state=
    {
        promotions:[],
        errMess:null,
        isLoading:true
    }
    ,action
    )=>{
        switch(action.type){
            case ActionTypes.PROMOS_FAILED: 
                return {...state,isLoading:false,errMess:action.payload,promotions:[]}
            case ActionTypes.ADD_PROMOS:
                return {...state,isLoading:false,errMess:null,promotions:action.payload}
            case ActionTypes.PROMOS_LOADING:
                return {...state,isLoading:true,errMess:null,promotions:[]}
            default:
                return state

        }
    }