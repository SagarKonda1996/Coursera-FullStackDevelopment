import React,{useState} from 'react'
import { Navbar, NavbarBrand} from "reactstrap";
import { DISHES } from "../../Shared/dishes";
import MenuComponent from './MenuComponent';
import DishdetailComponent from './DishdetailComponent';
const Main = props => {
    const [dishes, setDishes] = useState(DISHES)
    const [selectedDish, setSelectedDish] = useState(null)
    return (
        <>
        <Navbar dark color="primary">
     <div className="container">
       <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
     </div>
     </Navbar>
     <div>
            <div className="container">
                <div className="row">
                <MenuComponent dishes={dishes} onSelect={setSelectedDish}/>
                </div>
                <DishdetailComponent dish={selectedDish} />
            </div>
        </div>
     </>
    )
}



export default Main
