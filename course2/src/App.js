import React,{useState} from 'react';
import './App.css';
import { Navbar, NavbarBrand} from "reactstrap";
import MenuComponent from './Components/MenuComponent';
import { DISHES } from "./Shared/dishes";
import Main from './Components/Main';
function App() {
  const [dishes, setDishes] = useState(DISHES)
  return (
    <div className="App">
     {/* <Navbar dark color="primary">
     <div className="container">
       <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
     </div>
     </Navbar>
     <MenuComponent dishes={dishes}/> */}
     <Main/>
    </div>
  );
}

export default App;
