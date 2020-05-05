import React, { useState } from 'react'
import {
    Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle, BreadcrumbItem, Breadcrumb, Row, Col, Label, Button,
    Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Link } from "react-router-dom";
import Loading from '../Loading';
import { baseUrl } from '../../Shared/baseUrl';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const Comments = ({ comments = [] }) => {
    return comments.length > 0 ?
        <>
            <ul className="list-unstyled">
                {
                    comments.map(comment =>
                        <>
                            <li className="my-2">{comment.comment}</li>
                            <li className="my-2">{`--${comment.author},${new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}`}</li>
                        </>
                    )

                }
            </ul>
        </>
        : null
}
const CommentForm = ({ dishId, addComment }) => {
    const onSubmit = (values) => {
        addComment(dishId, values.rating, values.author, values.comment)
    }
    return <LocalForm onSubmit={(values) => onSubmit(values)}>
        <Row className="form-group">
            <Label htmlFor="rating" md={2}>Rating</Label>
            <Col md={10}>
                <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>


                </Control.select>
            </Col>
        </Row>
        <Row className="form-group">
            <Label htmlFor="author" md={2}>Your Name</Label>
            <Col md={10}>
                <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    className="form-control"
                    validators={{
                        minLength: minLength(2),
                        maxLength: maxLength(15)
                    }}
                />
                <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                        minLength: "Minimum 3 Characters Required",
                        maxLength: "Maximum 15 Characters Allowed"
                    }}
                />
            </Col>
        </Row>
        <Row className="form-group">
            <Label htmlFor="comment" md={2}>Comment</Label>
            <Col md={10}>
                <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    className="form-control"
                    rows="6"
                />
            </Col>
        </Row>
        <Row className="form-group">
            <Col>
                <Button type="submit" value="submit" color="primary"  >Submit</Button>
            </Col>
        </Row>
    </LocalForm>

}
const DishdetailComponent = (
    {
        dish,
        comments = [],
        addComment,
        isLoading,
        errMess,
        commentsErrMess
    }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen)
    }
    if (isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }
    else if (errMess) {
        return <div className="container">
            <div className="row">
                <h4>{errMess}</h4>
            </div>
        </div>
    }
    else if (dish) {
        return (
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
                            <CardImg top src={baseUrl+dish.image} alt={dish.name} />
                            <CardBody>
                                <CardTitle>{dish.name}</CardTitle>
                                <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <h4>Comments</h4>
                        <Comments comments={dish.comments ? dish.comments : comments} />
                        <Button outline onClick={toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                        <Modal isOpen={isModalOpen} toggle={toggleModal} >
                            <ModalHeader toggle={toggleModal}>Submit Comment</ModalHeader>
                            <ModalBody>
                                <CommentForm dishId={dish.id} addComment={addComment} />
                            </ModalBody>
                        </Modal>

                    </div>
                </div>
            </div>

        )
    }
    else {
        return null
    }

}

export default DishdetailComponent
