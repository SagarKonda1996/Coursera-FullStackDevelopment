import React from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle
} from 'reactstrap';
const Comments=({comments=[]})=>{
    return comments.length>0?
    <ul className="list-unstyled">
        {
            comments.map(comment=>
                <>
                <li className="my-2">{comment.comment}</li>
                <li className="my-2">{`--${comment.author},${new Date(comment.date).toDateString()}`}</li>
                </>
                )

        }
    </ul>
    
    :null
}
const DishdetailComponent = ({ dish }) => {
    return dish ?
    <div className="row">

            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                {console.log(dish)}
                <Comments comments={dish.comments}/>
            </div>
        </div>
        : null
}

export default DishdetailComponent
