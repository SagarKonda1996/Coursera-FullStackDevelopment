import { createStore,combineReducers,applyMiddleware } from "redux";
import { Reducer,initialState } from "./Reducer";
import { Dishes } from "./dishes";
import { Comments } from "./comments";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { InitialFeedback } from "./forms";
import { createForms } from "react-redux-form";

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
            promotions:Promotions,
            ...createForms({
                feedback:InitialFeedback
            })
        }),
        applyMiddleware(thunk,logger)
    )
    return store
}