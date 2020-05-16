import * as ActionTypes from './ActionTypes'
export const comments=(
    state=
    {
        comments:[],
        errMess:null,
    }
    ,action
    )=>{
        switch(action.type){
            case ActionTypes.COMMENTS_FAILED: 
                return {...state,errMess:action.payload,comments:[]}
            case ActionTypes.ADD_COMMENTS:
                return {...state,errMess:null,comments:action.payload}
            case ActionTypes.ADD_COMMENT:
                var comment=action.payload
                return {...state,comments:state.comments.concat(comment)}
            default:
                return state

        }
    }