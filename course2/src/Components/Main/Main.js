import React,{useState} from 'react'
import { Navbar, NavbarBrand} from "reactstrap";
import { DISHES } from "../../Shared/dishes";
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
import Header from '../Header';
import Footer from '../Footer';
const Main = props => {
    const [dishes, setDishes] = useState(DISHES)
    const [selectedDish, setSelectedDish] = useState(null)
    return (
        <>
       <Header/>
            <div className="container">
                <div className="row">
                <MenuComponent dishes={dishes} onSelect={setSelectedDish}/>
                </div>
                <DishdetailComponent dish={selectedDish} />
            </div>
        <Footer/>
     </>
    )
}



export default Main
