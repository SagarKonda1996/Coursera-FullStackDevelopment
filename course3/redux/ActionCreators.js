import { baseUrl } from "../shared/baseUrl";
import * as ActionTypes from './ActionTypes'


// Fetching Comments From Server
export const fetchComments=()=>(dispatch)=> {
    return fetch(baseUrl+'comments')
           .then(response=>{
               if(response.ok){
                   return response
               }
               else{
                   var error=new Error('Error'+response.status+':'+response.statusText)
                   error.response=response
                   throw error
               }
           },
           error=>{
               var errMess=new Error(error.message)
               throw errMess
           })
           .then(response=>response.json())
           .then(comments=>dispatch(addComments(comments)))
           .catch(error=>dispatch(commentsFailed(error.message))) 

}
export const commentsFailed=(errMess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errMess
})

export const addComments=(comments)=>({
    type:ActionTypes.ADD_COMMENTS,
    payload:comments
})



//Fetching Dishes from Server
export const fetchDishes=()=>(dispatch)=> {
    dispatch(dishesLoading())
    return fetch(baseUrl+'dishes')
           .then(response=>{
               if(response.ok){
                   return response
               }
               else{
                   var error=new Error('Error'+response.status+':'+response.statusText)
                   error.response=response
                   throw error
               }
           },
           error=>{
               var errMess=new Error(error.message)
               throw errMess
           })
           .then(response=>response.json())
           .then(dishes=>dispatch(addDishes(dishes)))
           .catch(error=>dispatch(dishesFailed(error.message))) 

}
export const dishesFailed=(errMess)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errMess
})

export const addDishes=(dishes)=>({
    type:ActionTypes.ADD_DISHES,
    payload:dishes
})

export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})


//PROMOS
export const fetchPromos=()=>(dispatch)=> {
    dispatch(promosLoading())
    return fetch(baseUrl+'promotions')
           .then(response=>{
               if(response.ok){
                   return response
               }
               else{
                   var error=new Error('Error'+response.status+':'+response.statusText)
                   error.response=response
                   throw error
               }
           },
           error=>{
               var errMess=new Error(error.message)
               throw errMess
           })
           .then(response=>response.json())
           .then(promotions=>dispatch(addPromos(promotions)))
           .catch(error=>dispatch(promosFailed(error.message))) 

}
export const promosFailed=(errMess)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errMess
})

export const addPromos=(promotions)=>({
    type:ActionTypes.ADD_PROMOS,
    payload:promotions
})

export const promosLoading=()=>({
    type:ActionTypes.PROMOS_LOADING
})


//LEADERS
export const fetchLeaders=()=>(dispatch)=> {
    dispatch(leadersLoading())

    return fetch(baseUrl+'leaders')
           .then(response=>{

               if(response.ok){
                   return response
               }
               else{
                   var error=new Error('Error'+response.status+':'+response.statusText)
                   error.response=response
                   throw error
               }
           },
           error=>{
               var errMess=new Error(error.message)
               throw errMess
           })
           .then(response=>response.json())
           .then(leaders=>dispatch(addLeaders(leaders)))
           .catch(error=>{
            
            dispatch(leadersFailed(error.message))}) 

}
export const leadersFailed=(errMess)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errMess
})

export const addLeaders=(leaders)=>({
    type:ActionTypes.ADD_LEADERS,
    payload:leaders
})

export const leadersLoading=()=>({
    type:ActionTypes.LEADERS_LOADING
})

export const postFavorite=(dishId)=>(dispatch)=>{
    setTimeout(() => {
        dispatch(addFavorite(dishId))
    }, 2000);
}
export const addFavorite=(dishId)=>({
    type:ActionTypes.ADD_FAVORITE,
    payload:dishId
})