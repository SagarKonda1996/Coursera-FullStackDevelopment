import { createStore,combineReducers,applyMiddleware } from "redux";
import { Reducer,initialState } from "./Reducer";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import logger from 'redux-logger'
import thunk from 'redux-thunk'

/*
 Global Reducer
*/

// export const ConfigureStore=()=>{
//     const store=createStore(
//         Reducer,
//         initialState
//         )
//     return store
// }
/*
Combined Reducer
*/
export const ConfigureStore=()=>{
    const store=createStore(
        combineReducers({
            dishes:Dishes,
            comments:Comments,
            leaders:Leaders,
            promotions:Promotions
        }),
        applyMiddleware(thunk,logger)
    )
    return store
}