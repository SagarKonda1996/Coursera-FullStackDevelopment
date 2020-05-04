import React,{useReducer} from 'react'
import { Breadcrumb, BreadcrumbItem , Form, FormGroup, Label, Input, Col,Button, FormFeedback} from 'reactstrap';
import { Link } from 'react-router-dom';
const Contact = props => {
    const [userInput, setUserInput] = useReducer(
        (state,newState)=>({...state,...newState}),
        {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contactType: 'Tel.',
            message: '',
            touched:{
                firstname: false,
                lastname: false,
                telnum: false,
                email: false,

            }
        }
        
        )

        const handleInputChange=(event)=>{
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        setUserInput({
            [name]:value
        })

        }
        const handleSubmit=(event)=>{
            console.log('Current State is: ' + JSON.stringify(userInput));
            alert('Current State is: ' + JSON.stringify(userInput));
            event.preventDefault();
        }
        const handleBlur=(event)=>{
            const field=event.target.name
            setUserInput({touched:{...userInput.touched,[field]:true}})

        }
        const validate=(firstname,lastname,telnum,email)=>{
            const errors={
                firstname: '',
                lastname: '',
                telnum: '',
                email: '',

            }
            if(userInput.touched.firstname && userInput.firstname.length<3){
                errors.firstname='First name Should be More than 3 Characters'
            }
            else if(userInput.touched.firstname && userInput.firstname.length>10)
            {
                errors.firstname='First name Should be Less than or Equal to 10 Characters'
            }
            if(userInput.touched.lastname && userInput.lastname.length<3){
                errors.lastname='Last name Should be More than 3 Characters'
            }
            else if(userInput.touched.lastname && userInput.lastname.length>10)
            {
                errors.lastname='Last name Should be Less than or Equal to 10 Characters'
            }
            const phonereg=/^\d+$/;
            if(userInput.touched.telnum && !phonereg.test(userInput.telnum)){
                errors.telnum='Telephone Numbers should only Contain Numbers'
            }
            const emailreg=/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            if(userInput.touched.email && !emailreg.test(userInput.email)){
                errors.email='Not a Valid Email Address'
            }
            
            return errors
        }
        const errors=validate(userInput.firstname,userInput.lastname,userInput.telnum,userInput.email)
    return (
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Contact Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Contact Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12">
                <h3>Location Information</h3>
                </div>
                <div className="col-12 col-sm-4 offset-sm-1">
                        <h5>Our Address</h5>
                        <address>
                        121, Clear Water Bay Road<br />
                        Clear Water Bay, Kowloon<br />
                        HONG KONG<br />
                        <i className="fa fa-phone"></i>: +852 1234 5678<br />
                        <i className="fa fa-fax"></i>: +852 8765 4321<br />
                        <i className="fa fa-envelope"></i>: <a href="mailto:confusion@food.net">confusion@food.net</a>
                        </address>
                </div>
                <div className="col-12 col-sm-6 offset-sm-1">
                    <h5>Map of our Location</h5>
                </div>
                <div className="col-12 col-sm-11 offset-sm-1">
                    <div className="btn-group" role="group">
                        <a role="button" className="btn btn-primary" href="tel:+85212345678"><i className="fa fa-phone"></i> Call</a>
                        <a role="button" className="btn btn-info"><i className="fa fa-skype"></i> Skype</a>
                        <a role="button" className="btn btn-success" href="mailto:confusion@food.net"><i className="fa fa-envelope-o"></i> Email</a>
                    </div>
                </div>
            </div>
            <div className="row row-content">
                   <div className="col-12">
                      <h3>Send us your Feedback</h3>
                   </div>
                    <div className="col-12 col-md-9">
                        <Form onSubmit={handleSubmit}>
                            <FormGroup row>
                                <Label htmlFor="firstname" md={2}>First Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="firstname" name="firstname"
                                        placeholder="First Name"
                                        value={userInput.firstname}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        valid={errors.firstname==''}
                                        invalid={errors.firstname!=''}
                                        />
                                    <FormFeedback>{errors.firstname}</FormFeedback>

                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="lastname" md={2}>Last Name</Label>
                                <Col md={10}>
                                    <Input type="text" id="lastname" name="lastname"
                                        placeholder="Last Name"
                                        value={userInput.lastname}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        valid={errors.lastname==''}
                                        invalid={errors.lastname!=''}
                                        />
                                        <FormFeedback>{errors.lastname}</FormFeedback>
                                </Col>                        
                            </FormGroup>
                            <FormGroup row>
                            <Label htmlFor="telnum" md={2}>Contact Tel.</Label>
                                <Col md={10}>
                                    <Input type="tel" id="telnum" name="telnum"
                                        placeholder="Tel. number"
                                        value={userInput.telnum}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        valid={errors.telnum==''}
                                        invalid={errors.telnum!=''}
                                        />
                                    <FormFeedback>{errors.telnum}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="email" md={2}>Email</Label>
                                <Col md={10}>
                                    <Input type="email" id="email" name="email"
                                        placeholder="Email"
                                        value={userInput.email}
                                        onChange={handleInputChange}
                                        onBlur={handleBlur}
                                        valid={errors.email==''}
                                        invalid={errors.email!=''}
                                        />
                                    <FormFeedback>{errors.email}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 6, offset: 2}}>
                                    <FormGroup check>
                                        <Label check>
                                            <Input type="checkbox"
                                                name="agree"
                                                checked={userInput.agree}
                                                onChange={handleInputChange} /> {' '}
                                            <strong>May we contact you?</strong>
                                        </Label>
                                    </FormGroup>
                                </Col>
                                <Col md={{size: 3, offset: 1}}>
                                    <Input type="select" name="contactType"
                                            value={userInput.contactType}
                                            onChange={handleInputChange}>
                                        <option>Tel.</option>
                                        <option>Email</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label htmlFor="message" md={2}>Your Feedback</Label>
                                <Col md={10}>
                                    <Input type="textarea" id="message" name="message"
                                        rows="12"
                                        value={userInput.message}
                                        onChange={handleInputChange}></Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{size: 10, offset: 2}}>
                                    <Button type="submit" color="primary">
                                        Send Feedback
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </div>
               </div>


        </div>
    )
}



export default Contact
