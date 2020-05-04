import React,{useState} from 'react'
import { Navbar, NavbarBrand} from "reactstrap";
// import { DISHES } from "../../Shared/dishes";
import MenuComponent from '../MenuComponent/MenuComponentWeek2';
import DishdetailComponent from '../DishdetailComponent/DishdetailWeek2';
import Header from '../Header';
import Footer from '../Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import Contact from '../Contact';
// import { DISHES,PROMOTIONS,LEADERS,COMMENTS } from "../../Shared/JSONDATA";
import {DISHES} from '../../Shared/dishes'
import {COMMENTS} from '../../Shared/comments'
import {PROMOTIONS} from '../../Shared/promotions'
import {LEADERS} from '../../Shared/leaders'
import About from '../Aboutus';
const Main = props => {
    
    const [dishes, setDishes] = useState(DISHES)
    const [homePageData, setHomePageData] = useState({
        dishes: DISHES,
        comments: COMMENTS,
        promotions: PROMOTIONS,
        leaders: LEADERS
    })
    const [selectedDish, setSelectedDish] = useState(null)
    const HomePage = () => {
        return(
            <Home 
            dish={homePageData.dishes.filter((dish) => dish.featured)[0]}
            promotion={homePageData.promotions.filter((promo) => promo.featured)[0]}
            leader={homePageData.leaders.filter((leader) => leader.featured)[0]}

            />
        );
      }
      const DishWithId = ({match}) => {
        return(
            <DishdetailComponent dish={homePageData.dishes.filter((dish) => dish.id === parseInt(match.params.dishId,10))[0]} 
              comments={homePageData.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId,10))} />
        );
      };
      const AboutUs=()=><About leaders={homePageData.leaders}/>
    return (
        <>
       <Header/>
            {/* <div className="container">
                <div className="row">
                <MenuComponent dishes={dishes} onSelect={setSelectedDish}/>
                </div>
                <DishdetailComponent dish={selectedDish} />
            </div> */}
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
                                        dishes={homePageData.dishes}
                                        onSelect={() => { }}
                                    />
                             
                    } />
                             

              <Redirect to="/home" />
          </Switch>
        <Footer/>
     </>
    )
}



export default Main
