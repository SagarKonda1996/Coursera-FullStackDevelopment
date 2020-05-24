import React, { useEffect,Component } from 'react'
import MenuComponent from '../MenuComponent/MenuComponentWeek2';
import DishdetailComponent from '../DishdetailComponent/DishdetailWeek2';
import Header from '../Header';
import Footer from '../Footer';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from '../Home';
import Contact from '../Contact';
import { connect } from "react-redux";
import About from '../Aboutus';
import { postComment,
     fetchDishes, 
     fetchComments, 
     fetchPromos,
     fetchLeaders,
     fetchFavorites,
     postFavorites,
     deleteFavorite,
     loginUser,
     logoutUser
 } from "../../Redux/ActionCreators";
import { actions } from "react-redux-form";
import { TransitionGroup,CSSTransition } from "react-transition-group";
import Favorites from '../Favorites'

//Functions

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders,
        auth:state.auth,
        favorites:state.favorites
    }
}
const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, comment) => dispatch(postComment(dishId, rating, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments:()=>dispatch(fetchComments()),
    fetchPromos:()=>dispatch(fetchPromos()),
    fetchLeaders:()=>dispatch(fetchLeaders()),
    fetchFavorites:()=>dispatch(fetchFavorites()),
    postFavorites:(dishId)=>dispatch(postFavorites(dishId)),
    deleteFavorite:(dishId)=>dispatch(deleteFavorite(dishId)),
    loginUser:(creds)=>dispatch(loginUser(creds)),
    logoutUser:()=>dispatch(logoutUser())
})


// Main Component
const Main = ({
    dishes,
    promotions,
    comments,
    leaders,
    postComment,
    fetchDishes,
    resetFeedbackForm,
    fetchComments,
    fetchPromos,
    fetchLeaders,
    fetchFavorites,
    postFavorites,
    deleteFavorite,
    auth,
    loginUser,
    logoutUser,
    favorites,
    location

}) => {
    //Components
    const PrivateRoute=({component:Component,...rest})=>{
       return <Route {...rest} render={() => (
            auth.isAuthenticated
              ? <Component  />
              : <Redirect to='/home' />
          )} />
    
    }
    const HomePage = () => {
        return (
            <Home
                dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
                leader={leaders.leaders.filter((leader) => leader.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishesErrMess={dishes.errMess}
                promosLoading={promotions.isLoading}
                promosErrMess={promotions.errMess}
                leadersLoading={leaders.isLoading}
                leadersErrMess={leaders.errMess}

            />
        );
    }
    const DishWithId = ({ match }) => {
        const isFavorite=favorites.favorites&&favorites.favorites.dishes&&favorites.favorites.dishes.filter(dish=>dish._id==match.params.dishId).length>0?true:false
        return (
            <DishdetailComponent
                dish={dishes.dishes.filter((dish) => dish._id ==match.params.dishId)[0]}
                comments={comments.comments.filter((comment) => comment.dish == match.params.dishId)}
                postComment={postComment}
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}
                commentsErrMess={comments.errMess}
                postFavorite={postFavorites}
                deleteFavorite={deleteFavorite}
                favorite={isFavorite}
            />
        );
    };
    const AboutUs = () => <About leaders={leaders.leaders} />
    const Menu = () =>
        <MenuComponent
            dishes={dishes}
            onSelect={() => { }}

        />

    const ContactUS = () =>
        <Contact
            resetFeedbackForm={resetFeedbackForm}
        />


    //Functions
    useEffect(() => {
        fetchDishes()
        fetchPromos()
        fetchComments()
        fetchLeaders()
        fetchFavorites()
    }, [])

    return (
        <>
            <Header 
            auth={auth} 
            loginUser={loginUser} 
            logoutUser={logoutUser}  />
            <TransitionGroup>
                <CSSTransition key={location.key} classNames="page" timeout={3000}>
                    <Switch>
                        <Route path='/home' component={HomePage} />
                        <Route exact path='/contactus' component={ContactUS} />} />
                        <Route path='/menu/:dishId' component={DishWithId} />
                        <Route exact path='/aboutus' component={AboutUs} />} />
                        <Route exact path='/menu' component={Menu} />} />
                        <PrivateRoute exact path="/favorites" component={() => <Favorites favorites={favorites.favorites} deleteFavorite={deleteFavorite} />} />
                        <Redirect to="/home" />
                    </Switch>
                </CSSTransition>
            </TransitionGroup>
            <Footer />
        </>
    )
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
