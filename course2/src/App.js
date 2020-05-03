import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand} from "reactstrap";
import MenuComponent from './Components/MenuComponent';
function App() {
  return (
    <div className="App">
     <Navbar dark color="primary">
     <div className="container">
       <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
     </div>
     </Navbar>
     <MenuComponent/>
    </div>
  );
}

export default App;
