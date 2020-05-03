import React, { useState } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
const CardMenuComponent = ({ dishes = [] }) => {
    const [selectedDish, setSelectedDish] = useState(null)

    const RenderDish = ({ dish }) => {
        return dish ?
            <Card>
                <CardImg top src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            : null
    }
    const Menu = () => {
        return dishes.map(dish => <div className="col-12 col-md-5 m-1">
            <Card key={dish.id}
                onClick={() => setSelectedDish(dish)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        </div>)
    }
    return (
        <div>
            <div className="container">
                <div className="row">
                    <Menu />
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={selectedDish} />
                    </div>
                </div>
            </div>
        </div>
    )
}



export default CardMenuComponent
