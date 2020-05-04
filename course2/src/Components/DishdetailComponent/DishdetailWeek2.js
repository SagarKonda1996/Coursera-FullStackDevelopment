import React from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle,BreadcrumbItem,Breadcrumb
} from 'reactstrap';
import { Link } from "react-router-dom";
const Comments=({comments=[]})=>{
    return comments.length>0?
    <ul className="list-unstyled">
        {
            comments.map(comment=>
                <>
                <li className="my-2">{comment.comment}</li>
                <li className="my-2">{`--${comment.author},${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}`}</li>
                </>
                )

        }
    </ul>
    
    :null
}
const DishdetailComponent = ({ dish,comments=[] }) => {
    return dish ?
    <div className="container">
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{dish.name}</h3>
                        <hr />
                    </div>                
                </div>
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
                <Comments comments={dish.comments?dish.comment:comments}/>
            </div>
        </div>
        </div>
        : null
}

export default DishdetailComponent
