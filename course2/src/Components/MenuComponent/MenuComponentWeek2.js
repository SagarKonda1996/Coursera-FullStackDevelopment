import React, { useState } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle,Breadcrumb,BreadcrumbItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import Loading from '../Loading';

const RenderMenuItem=({
    dish,
    onSelect
})=>{
    return  <Link to={`/menu/${dish.id}`}>
    <Card key={dish.id}
        onClick={() => onSelect(dish)}>
        <CardImg width="100%" src={dish.image} alt={dish.name} />
        <CardImgOverlay>
            <CardTitle>{dish.name}</CardTitle>
        </CardImgOverlay>
    </Card>
    </Link>
}
const MenuComponent = (
    { 
        dishes, 
        onSelect
     }) => {
    const Menu = () => {
        return dishes.dishes.map((dish) =>
        <div key={dish.id} className="col-12 col-md-5 m-1">
           <RenderMenuItem 
           dish={dish}
           onSelect={onSelect}
           />
        </div>
        )
    }
    
    if(dishes.isLoading){
        return (<Loading/>)
    }
    else if(dishes.errMess){
        return(
        <h4>{dishes.errMess}</h4>
        )
    }

    return (
        <div className="container">
             <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>                
                </div>
            <div className="row">
            <Menu />
            </div>
        </div>

    )
}



export default MenuComponent
