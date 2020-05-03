import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button, CardImgOverlay
} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';


class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderComments(comments) {
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    {comments.map((comment) => {
                        const date = new Date(comment.date).toLocaleString('en', { month: 'short', year: 'numeric', day: 'numeric' });
                        return (
                            <li>
                                <p>{comment.comment}</p>
                                <p>--{comment.author}, {date}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }

    renderDish(dish) {
        return (
            <Card>
                <CardImg src={this.props.dish.image} />
                <CardBody>
                    <CardTitle><h6>{this.props.dish.name}</h6></CardTitle>
                    <CardText>{this.props.dish.description}
                    </CardText>
                </CardBody>
            </Card>
        );
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(this.props.dish.comments)}
                </div>
            </div>
        );
    }
}

export default DishDetail;