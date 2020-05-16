import { createStore,combineReducers,applyMiddleware } from "redux";
import { persistStore,persistCombineReducers } from "redux-persist";
// import storage from 'redux-persist/es/storage'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import {dishes} from './dishes'
import {promotions} from './promotions'
import {leaders} from './leaders'
import {comments} from './comments'
import {favorites} from './favorites'
import {AsyncStorage} from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage';

//Using Without Persistence

// export const ConfigureStore=()=>{
//     const store=createStore(
//         combineReducers({
//             dishes,
//             promotions,
//             leaders,
//             comments,
//             favorites
//         }),
//         applyMiddleware(thunk,logger)
//     )
//     return store
// }

//Using With Persistence
export const ConfigureStore=()=>{
    const config={
        key:'root',
        storage:AsyncStorage,
        debug:true
    }
    const store=createStore(
        persistCombineReducers(config,{
            dishes,
            promotions,
            leaders,
            comments,
            favorites
        }),
        applyMiddleware(thunk,logger)
    )
    const persistor=persistStore(store)
    return {persistor,store}
}
