import * as ActionTypes from './ActionTypes'
export const favorites=(state=[],action)=>{
    switch(action.type){
        case ActionTypes.ADD_FAVORITE:
            if(state.filter(item=>item==action.payload).length>0){
                return state.filter(item=>item!=action.payload)
            }
            else
            {
                return state.concat(action.payload)
            }
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(item=>item!=action.payload)
        default: return state

    }
}