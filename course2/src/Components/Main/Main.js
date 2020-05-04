import React,{useState} from 'react'
import MenuComponent from '../MenuComponent/MenuComponentWeek2';
import DishdetailComponent from '../DishdetailComponent/DishdetailWeek2';
import Header from '../Header';
import Footer from '../Footer';
import { Switch, Route, Redirect,withRouter } from 'react-router-dom';
import Home from '../Home';
import Contact from '../Contact';
import { connect } from "react-redux";
import About from '../Aboutus';
import { addComment } from "../../Redux/ActionCreators";
const mapStateToProps=state=>{
    return {
        dishes:state.dishes,
        comments:state.comments,
        promotions:state.promotions,
        leaders:state.leaders
    }
}
const mapDispatchToProps=dispatch=>({
    addComment: (dishId, rating, author, comment)=>dispatch(addComment (dishId, rating, author, comment))
})
const Main = ({dishes=[],promotions=[],comments=[],leaders=[],addComment}) => {
    
    
    const HomePage = () => {
        return(
            <Home 
            dish={dishes.filter((dish) => dish.featured)[0]}
            promotion={promotions.filter((promo) => promo.featured)[0]}
            leader={leaders.filter((leader) => leader.featured)[0]}

            />
        );
      }
      const DishWithId = ({match}) => {
        return(
            <DishdetailComponent 
            dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
            comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} 
            addComment={addComment}
            />
        );
      };
      const AboutUs=()=><About leaders={leaders}/>
    return (
        <>
       <Header/>
             <Switch>
              <Route path='/home' component={HomePage} />
              <Route exact path='/contactus' component={Contact} />} />
              <Route path='/menu/:dishId' component={DishWithId} />
              <Route exact path='/aboutus' component={AboutUs} />} />


                <Route
                    exact
                    path='/menu'
                    component={
                        () =>
                          
                                    <MenuComponent
                                        dishes={dishes}
                                        onSelect={() => { }}
                                    />
                             
                    } />
                             

              <Redirect to="/home" />
          </Switch>
        <Footer/>
     </>
    )
}



export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
