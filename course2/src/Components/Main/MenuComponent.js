import React, { useState } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
const MenuComponent = ({ dishes = [] ,onSelect}) => {
    const Menu = () => {
        return dishes.map(dish => <div className="col-12 col-md-5 m-1">
            <Card key={dish.id}
                onClick={() => onSelect(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </div>)
    }
    return (
      
                    <Menu />
                
    )
}



export default MenuComponent
