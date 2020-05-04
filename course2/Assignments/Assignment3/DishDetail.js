import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardTitle, CardText, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, Label, Row } from "reactstrap";
import { Errors, Control, LocalForm } from 'react-redux-form';
import { Link } from 'react-router-dom';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({dish}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg width="100%" object src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>
    );
}

function RenderComments({comments}) {
    return(
        <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {comments.map((index) => {
                return (
                    <div>
                        {index.comment}
                        <br></br>
                        <br></br>
                        --{index.author},{new Intl.DateTimeFormat('en-US', { year:'numeric', month:'short', day:'2-digit' }).format(new Date(Date.parse(index.date)))}
                        <br></br>
                        <br></br>
                    </div>
                );  
            })}
            <CommentForm />
        </div>
    ); 
}

const DishDetail = (props) => {
    if(props.dish != null) {
        return(
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                <div className="row">
                    </div>
                        <RenderDish dish = {props.dish} />
                        <RenderComments comments = {props.comments} />
                    </div>
            </div>
        );
    }
        
    else {
        return(
            <div></div>
        );
    }
}

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleCommentForm.bind(this);

    }

    toggleModal() {
        this.setState({
            isModalOpen: !(this.state.isModalOpen)
        });
    }

    handleCommentForm(values) {
        this.toggleModal();
        alert(JSON.stringify(values));
        console.log(JSON.stringify(values));
    }

    render() {
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>

                <Modal  isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentForm(values)} >
                            <div>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </div>
                                    <h1></h1>
                            <div>
                                <Label htmlFor="yourname">Your Name</Label>
                                <Control.text model=".name" id="yourname" name="yourname" className="form-control"
                                    placeholder="Your Name"
                                    validators={{
                                        minLength: minLength(2), maxLength: maxLength(15)                                    
                                    }} 
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters ',
                                        maxLength: 'Must be 15 characters or less '
                                    }}
                                />                                
                            </div>
                                    <h1></h1>
                            <div>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" className="form-control" name="comment" rows="6"/>                               
                            </div>
                                    <h1></h1>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </div>
        );
    }
}

export default DishDetail;