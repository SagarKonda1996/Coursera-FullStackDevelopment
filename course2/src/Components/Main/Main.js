import React, { useEffect } from 'react'
import MenuComponent from '../MenuComponent/MenuComponentWeek2';
import DishdetailComponent from '../DishdetailComponent/DishdetailWeek2';
import Header from '../Header';
import Footer from '../Footer';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from '../Home';
import Contact from '../Contact';
import { connect } from "react-redux";
import About from '../Aboutus';
import { postComment, fetchDishes, fetchComments, fetchPromos } from "../../Redux/ActionCreators";
import { actions } from "react-redux-form";



//Functions

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}
const mapDispatchToProps = dispatch => ({
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
    fetchDishes: () => dispatch(fetchDishes()),
    resetFeedbackForm: () => dispatch(actions.reset('feedback')),
    fetchComments:()=>dispatch(fetchComments()),
    fetchPromos:()=>dispatch(fetchPromos())
})


// Main Component
const Main = ({
    dishes,
    promotions = [],
    comments = [],
    leaders = [],
    postComment,
    fetchDishes,
    resetFeedbackForm,
    fetchComments,
    fetchPromos

}) => {
    //Components
    const HomePage = () => {
        return (
            <Home
                dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
                leader={leaders.filter((leader) => leader.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishesErrMess={dishes.errMess}
                promosLoading={promotions.isLoading}
                promosErrMess={promotions.errMess}

            />
        );
    }
    const DishWithId = ({ match }) => {
        return (
            <DishdetailComponent
                dish={dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                comments={comments.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                postComment={postComment}
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}
                commentsErrMess={comments.errMess}
            />
        );
    };
    const AboutUs = () => <About leaders={leaders} />
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
    }, [])

    return (
        <>
            <Header />
            <Switch>
                <Route path='/home' component={HomePage} />
                <Route exact path='/contactus' component={ContactUS} />} />
                <Route path='/menu/:dishId' component={DishWithId} />
                <Route exact path='/aboutus' component={AboutUs} />} />
                <Route exact path='/menu' component={Menu} />} />
                <Redirect to="/home" />
            </Switch>
            <Footer />
        </>
    )
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
