import React,{useState} from 'react'
import { Navbar, NavbarBrand} from "reactstrap";
import { DISHES } from "../../Shared/dishes";
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import Header from '../Header';
import Footer from '../Footer';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../Home';

const Main = props => {
    const HomePage = () => {
        return(
            <Home 
            />
        );
      }
    const [dishes, setDishes] = useState(DISHES)
    const [selectedDish, setSelectedDish] = useState(null)
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
