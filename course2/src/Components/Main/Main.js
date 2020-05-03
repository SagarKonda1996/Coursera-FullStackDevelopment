import React,{useState} from 'react'
import { Navbar, NavbarBrand} from "reactstrap";
import { DISHES } from "../../Shared/dishes";
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import Header from '../Header';
import Footer from '../Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';
import Contact from '../Contact';
import { DISHES1,PROMOTIONS,LEADERS,COMMENTS } from "../../Shared/JSONDATA";
const Main = props => {
    
    const [dishes, setDishes] = useState(DISHES)
    const [homePageData, setHomePageData] = useState({
        dishes: DISHES1,
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

                <Route
                    exact
                    path='/menu'
                    component={
                        () =>
                            <div className="container">
                                <div className="row">
                                    <MenuComponent
                                        dishes={dishes}
                                        onSelect={() => { }}
                                    />
                                </div>
                            </div>

                    } />
                             

              <Redirect to="/home" />
          </Switch>
        <Footer/>
     </>
    )
}



export default Main
