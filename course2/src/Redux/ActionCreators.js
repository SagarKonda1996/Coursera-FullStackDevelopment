import * as ActionTypes from './ActionTypes';
import { DISHES } from '../Shared/dishes';
import {baseUrl} from '../Shared/baseUrl'
// Operations on Comments
export const addComment = (comment) => ({
    type: ActionTypes.ADD_COMMENT,
    payload: comment
});

export const postComment=(dishId, rating, comment) =>(dispatch)=> {
    const newComment= {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    newComment.date=new Date().toISOString()
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+'comments',{
        method:'POST',
        body:JSON.stringify(newComment),
        headers:{
            'Content-Type':'application/json',
            'Authorization': bearer

        },
        credentials:'same-origin'

    })
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error =new Error('Error ' + response.status + ' : '+ response.statusText)
            error.response=response
            throw error
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err
    }
    )
    .then(response=>response.json())
    .then(response=>dispatch(addComment(response)))
    .catch(error=>{
        alert(`Your Comment Could Not be Posted ${error.message}`)
    })
}
   

// Fetching DISHES


export const fetchDishes=()=>(dispatch)=>{
    dispatch(dishesLoading(true));
    return fetch(baseUrl+'dishes')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error =new Error('Error ' + response.status + ' : '+ response.statusText)
            error.response=response
            throw error
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err
    }
    )
    .then(response=>response.json())
    .then(dishes=>dispatch(addDishes(dishes)))
    .catch(error=>{
        dispatch(dishesFailed(error.message))
    })
}


export const dishesLoading=()=>({
    type:ActionTypes.DISHES_LOADING
})
export const addDishes=(dishes)=>({
type:ActionTypes.ADD_DISHES,
payload:dishes
})

export const dishesFailed=(errMess)=>({
    type:ActionTypes.DISHES_FAILED,
    payload:errMess
})


//Fetching Comments
export const fetchComments=()=>(dispatch)=>{
    return fetch(baseUrl+'comments')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error =new Error('Error ' + response.status + ' : '+ response.statusText)
            error.response=response
            throw error
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err
    }
    )
    .then(response=>response.json())
    .then(comments=>dispatch(addComments(comments)))
    .catch(error=>{
        dispatch(commentsFailed(error.message))
    })
}



export const addComments=(comments)=>({
type:ActionTypes.ADD_COMMENTS,
payload:comments
})

export const commentsFailed=(errMess)=>({
    type:ActionTypes.COMMENTS_FAILED,
    payload:errMess
})

//Fetching Promos
export const fetchPromos=()=>(dispatch)=>{
    dispatch(promosLoading(true));
    return fetch(baseUrl+'promotions')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error =new Error('Error ' + response.status + ' : '+ response.statusText)
            error.response=response
            throw error
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err
    }
    )
    .then(response=>response.json())
    .then(promos=>dispatch(addPromos(promos)))
    .catch(error=>{
        dispatch(promosFailed(error.message))
    })
}


export const promosLoading=()=>({
    type:ActionTypes.PROMOS_LOADING
})
export const addPromos=(promos)=>({
type:ActionTypes.ADD_PROMOS,
payload:promos
})

export const promosFailed=(errMess)=>({
    type:ActionTypes.PROMOS_FAILED,
    payload:errMess
})

//Fetching Leaders
export const fetchLeaders=()=>(dispatch)=>{
    dispatch(leadersLoading(true));
    return fetch(baseUrl+'leaders')
    .then(response=>{
        if(response.ok){
            return response
        }
        else{
            var error =new Error('Error ' + response.status + ' : '+ response.statusText)
            error.response=response
            throw error
        }
    },
    error=>{
        var err=new Error(error.message);
        throw err
    }
    )
    .then(response=>response.json())
    .then(leaders=>dispatch(addLeaders(leaders)))
    .catch(error=>{
        dispatch(leadersFailed(error.message))
    })
}


export const leadersLoading=()=>({
    type:ActionTypes.LEADERS_LOADING
})
export const addLeaders=(leaders)=>({
type:ActionTypes.ADD_LEADERS,
payload:leaders
})

export const leadersFailed=(errMess)=>({
    type:ActionTypes.LEADERS_FAILED,
    payload:errMess
})

//Favorites
export const postFavorites=(dishId)=>(dispatch)=>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+'favorites/'+dishId,{
        method:"POST",
        body:JSON.stringify({"_id":dishId}),
        headers:{
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        "credentials":"same-origin"
    })
    .then((response)=>{
        if(response.ok)
        {
            return response
        }
        else
        {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(favorites => { dispatch(addFavorites(favorites)); })
  .catch(error => dispatch(favoritesFailed(error.message)));
}

export const deleteFavorite=(dishId)=>(dispatch)=>{
    const bearer = 'Bearer ' + localStorage.getItem('token');
    return fetch(baseUrl+'favorites/'+dishId,{
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
            'Authorization': bearer
        },
        "credentials":"same-origin"
    })
    .then((response)=>{
        if(response.ok)
        {
            return response
        }
        else
        {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(favorites => { dispatch(addFavorites(favorites)); })
  .catch(error => dispatch(favoritesFailed(error.message)));
}
export const fetchFavorites = () => (dispatch) => {
    dispatch(favoritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favorites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favorites => dispatch(addFavorites(favorites)))
    .catch(error => dispatch(favoritesFailed(error.message)));
}



export const favoritesLoading=()=>({
    type:ActionTypes.FAVORITES_LOADING
})
export const addFavorites=(leaders)=>({
type:ActionTypes.ADD_FAVORITES,
payload:leaders
})

export const favoritesFailed=(errMess)=>({
    type:ActionTypes.FAVORITES_FAILED,
    payload:errMess
})

//Authentication
export const requestLogin = (creds) => {
    return {
        type: ActionTypes.LOGIN_REQUEST,
        creds
    }
}
  
export const receiveLogin = (response) => {
    return {
        type: ActionTypes.LOGIN_SUCCESS,
        token: response.token
    }
}
  
export const loginError = (message) => {
    return {
        type: ActionTypes.LOGIN_FAILURE,
        message
    }
}

export const loginUser = (creds) => (dispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds))

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        body: JSON.stringify(creds),
        headers: { 
            'Content-Type':'application/json' 
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            localStorage.setItem('creds', JSON.stringify(creds));
            // Dispatch the success action
            dispatch(fetchFavorites());
            dispatch(receiveLogin(response));
        }
        else {
            var error = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginError(error.message)))
};

export const requestLogout = () => {
    return {
      type: ActionTypes.LOGOUT_REQUEST
    }
}
  
export const receiveLogout = () => {
    return {
      type: ActionTypes.LOGOUT_SUCCESS
    }
}

// Logs the user out
export const logoutUser = () => (dispatch) => {
    dispatch(requestLogout())
    localStorage.removeItem('token');
    localStorage.removeItem('creds');
    dispatch(favoritesFailed("Error 401: Unauthorized"));
    dispatch(receiveLogout())
}