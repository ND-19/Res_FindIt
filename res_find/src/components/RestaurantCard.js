import React, { useEffect, useState } from 'react';
import { Card, CardImg, CardBody, CardText, CardHeader, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, DropdownItem, Col, Button, ButtonDropdown, FormFeedback, DropdownToggle, DropdownMenu, Carousel, CarouselItem, CarouselControl } from 'reactstrap';
import imgdefault from '../resources/restaurant.jpg';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../button.css'
import Swal from 'sweetalert2';


function RenderRestaurantItem({ handleClick, restaurant, onRestaurantClick }) {
    const [radius, setradius] = useState(1)
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const [modal, setmodal] = useState(false)
    const [firstname, setfirstname] = useState(`${user.firstName}`);
    const [lastname, setlastname] = useState(`${user.lastName}`);
    const [email, setemail] = useState(`${user.email}`);
    var images = []
    // State for Active index
    const [activeIndex, setActiveIndex] = React.useState(0);

    // State for Animation
    const [animating, setAnimating] = React.useState(false);
    const [img, setimg] = useState([])
    const [telnum, settelnum] = useState('');
    const [date, setdate] = useState('');
    const [time, settime] = useState('');
    const [dropdownOpen, setdropdownOpen] = useState(false);
    const [dropdownValue, setdropdownValue] = useState('Select');
    const [touched, settouched] = useState({
        firstname: false,
        lastname: false,
        telnum: false,
        email: false,
        dropdownValue: false
    })
    // Items array length
    const imageslen = img.length - 1

    // Previous button for Carousel
    const previousButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ?
            imageslen : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    // Next button for Carousel
    const nextButton = () => {
        if (animating) return;
        const nextIndex = activeIndex === imageslen ?
            0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }
    const carouselItemData = img.map((item) => {
        return (
            <CarouselItem
                key={item.default}
                onExited={() => setAnimating(false)}
                onExiting={() => setAnimating(true)}
            >
                <img src={item.default} className='img' style={{ width: "100%", height: "200px" }}  />
            </CarouselItem>
        );
    })
    const importAll = (r) => {

        return r.keys().map(r);
    }
    useEffect(() => {
        try{
            
            // console.log(resfolder)
            images = importAll(require.context(`../../public/uploads/${restaurant.name}`, false, /\.(png|jpe?g|svg)$/))
            setimg(images)
        }catch(err){
            console.log("err")
        }
        

    }, [])
    
    const toggle = () => {
        setdropdownOpen(!dropdownOpen);
    }
    const changeValue = (e) => {
        setdropdownValue(e.target.innerText)
    }

    const arrayBufferToBase64 = (buffer) => {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const onReserve = () => {
        const Restaurant = { "name": restaurant.name, "locality": restaurant.locality, "address": restaurant.address, "AvgCostForTwo": restaurant.average_cost_for_two }
        async function fetchData() {
            try {
                const results = await (
                    await axios.post(`/api/bookings/${restaurant.res_id}`, { "userId": user._id, date, time, Restaurant, "numberOfPeople": dropdownValue, "email": user.email })).data;

                Swal.fire(
                    "Congratulations",
                    "Booking successfull",
                    "success"
                ).then(() => {
                    setmodal(!modal)
                });


            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }

    const validate = (firstname, lastname, telnum, email, dropdownValue) => {
        const errors = {
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            dropdownValue: ''
        };
        if (touched.firstname && firstname.length === 0)
            errors.firstname = 'First Name should not be empty';

        if (touched.lastname && lastname.length === 0)
            errors.lastname = 'Last Name should not be empty';

        const reg = /^\d+$/;
        if (touched.telnum && !reg.test(telnum))
            errors.telnum = 'Mobile Number should contain only numbers';

        if (touched.email && email.split('').filter(x => x === '@').length !== 1)
            errors.email = 'Email should contain a @';
        if (touched.dropdownValue && dropdownValue == "Select")
            errors.dropdownValue = 'Please select the number of guests'
        return errors;
    }
    const errors = validate(firstname, lastname, telnum, email, dropdownValue);
    return (
        <div>
            <Card key={restaurant.res_id} id="card">
                <CardHeader tag="h3" id="cardh">{restaurant.name}</CardHeader>
                <CardBody style={{ textAlign: "center" }} id='cardb'>
                    {/* {console.log(img)} */}
                    {img.length ? <Carousel previous={previousButton} next={nextButton}
                        activeIndex={activeIndex}>
                        {/* <CarouselIndicators items={items}
                            activeIndex={activeIndex}
                            onClickHandler={(newIndex) => {
                                if (animating) return;
                                setActiveIndex(newIndex);
                            }} /> */}
                        {carouselItemData}
                        <CarouselControl directionText="Prev"
                            direction="prev" onClickHandler={previousButton} />
                        <CarouselControl directionText="Next"
                            direction="next" onClickHandler={nextButton} />
                    </Carousel> : <CardImg className='img' style={{ width: "100%", height: "200px" }} src={imgdefault} alt={restaurant.name} />}


                    <CardText>{restaurant.address}</CardText>
                    <table>
                        <tbody>
                            <tr>
                                <td>Lat-Long</td>
                                <td>{restaurant.latitude.toPrecision(4)} &deg;N {restaurant.longitude.toPrecision(4)} &deg;E</td>
                            </tr>
                            <tr>
                                <td>Type</td>
                                <td>{restaurant.establishment}</td>
                            </tr>
                            <tr>
                                <td>City</td>
                                <td>{restaurant.city}</td>
                            </tr>
                            <tr>
                                <td>Open Time</td>
                                <td><i>{parseInt(restaurant.open_time.slice(0, 2))}</i>
                                    {parseInt(restaurant.open_time.slice(0, 2)) === 12 ? <i> Pm</i> : <i> Am</i>}
                                </td>
                            </tr>
                            <tr>
                                <td>Close Time</td>
                                <td>
                                    {parseInt(restaurant.close_time.slice(0, 2)) - 12 === -12 ? <i>12 Am</i> : <i>{parseInt(restaurant.close_time.slice(0, 2)) - 12} Pm</i>}
                                </td>
                            </tr>
                            <tr>
                                <td>Rating</td>
                                <td>{restaurant.aggregate_rating}</td>
                            </tr>
                            <tr>
                                <td>Cost for two</td>
                                <td>{restaurant.average_cost_for_two}</td>
                            </tr>
                            <tr>
                                <td>Cuisines</td>
                                <td>{restaurant.cuisines}</td>
                            </tr>
                            <tr>
                                <td>Highlights</td>
                                <td>{restaurant.highlights.slice(1, -1)}</td>
                            </tr>
                        </tbody>
                    </table>
                    <input
                        style={{ width: "100%", textAlign: "center", fontSize: "14px" }}
                        type="text"
                        placeholder="Radius"
                        value={radius}
                        name="radius"
                        onChange={(e) => setradius(e.target.value)}
                    />
                    <button className='button' style={{ width: "100%", height: "30px", borderRadius: "0px", borderTop: "1px solid black" }} onClick={() => handleClick(parseInt(restaurant.res_id), radius, restaurant.latitude, restaurant.longitude)}>Click</button>
                </CardBody>
                <button
                    className='button'
                    onClick={() => {
                        onRestaurantClick(restaurant.latitude, restaurant.longitude, restaurant.name);
                    }}
                    style={{ width: "100%", backgroundColor: "lightcoral", height: "30px", borderRadius: "0px", borderTop: "1px solid black" }}
                >Locate</button>
                <button
                    onClick={() => { setmodal(!modal) }} style={{ color: 'white' }}
                    className='button'
                    style={{ width: "100%", backgroundColor: "red", height: "30px", borderRadius: "0px", borderTop: "1px solid black" }}
                >Reserve Table</button>
            </Card>
            <Modal isOpen={modal} toggle={() => { setmodal(!modal) }} className='modal-lg'>
                <ModalHeader toggle={() => { setmodal(!modal) }}>Reserve Table (Restaurant Name: {restaurant.name})</ModalHeader>
                <ModalBody>
                    <div className='row row-content'>
                        <Col sm={{ size: 12 }} md={{ size: 12 }}>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup row>
                                    <Label htmlFor="firstname" md={2}>First Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="firstname" name="firstname"
                                            placeholder="First Name"
                                            value={firstname}
                                            valid={errors.firstname === ''}
                                            invalid={errors.firstname !== ''}
                                            onBlur={() => { settouched({ ...touched, firstname: true }) }}
                                            onChange={(e) => { setfirstname(e.target.value) }} />
                                        <FormFeedback>{errors.firstname}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="lastname" md={2}>Last Name</Label>
                                    <Col md={10}>
                                        <Input type="text" id="lastname" name="lastname"
                                            placeholder="Last Name"
                                            value={lastname}
                                            valid={errors.lastname === ''}
                                            invalid={errors.lastname !== ''}
                                            onBlur={() => { settouched({ ...touched, lastname: true }) }}
                                            onChange={(e) => { setlastname(e.target.value) }} />
                                        <FormFeedback>{errors.lastname}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="telnum" md={2}>Contact Num.</Label>
                                    <Col md={10}>
                                        <Input type="tel" id="telnum" name="telnum"
                                            placeholder="Mobile number"
                                            value={telnum}
                                            valid={errors.telnum === ''}
                                            invalid={errors.telnum !== ''}
                                            onBlur={() => { settouched({ ...touched, telnum: true }) }}
                                            onChange={(e) => { settelnum(e.target.value) }} />
                                        <FormFeedback>{errors.telnum}</FormFeedback>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="email" md={2}>Email</Label>
                                    <Col md={10}>
                                        <Input type="email" id="email" name="email"
                                            placeholder="Email"
                                            value={email}
                                            valid={errors.email === ''}
                                            invalid={errors.email !== ''}
                                            onBlur={() => { settouched({ ...touched, email: true }) }}
                                            onChange={(e) => { setemail(e.target.value) }} />
                                        <FormFeedback>{errors.email}</FormFeedback>
                                    </Col>
                                </FormGroup>

                                <FormGroup row>
                                    <Label htmlFor="numberofguest" md={2}>Number of Guests</Label>
                                    <Col md={2} style={{ paddingTop: '12px' }}>
                                        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle caret >
                                                {dropdownValue}
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem header >Select</DropdownItem>
                                                <DropdownItem onClick={changeValue}>1</DropdownItem>
                                                <DropdownItem onClick={changeValue}>2</DropdownItem>
                                                <DropdownItem onClick={changeValue}>3</DropdownItem>
                                                <DropdownItem onClick={changeValue}>4</DropdownItem>
                                                <DropdownItem onClick={changeValue}>5</DropdownItem>
                                                <DropdownItem onClick={changeValue}>6</DropdownItem>
                                            </DropdownMenu>
                                        </ButtonDropdown>
                                        <FormFeedback>{errors.dropdownValue}</FormFeedback>
                                    </Col>

                                </FormGroup>
                                <FormGroup row>
                                    <Label htmlFor="Date" md={2}>Date</Label>
                                    <Col md={4}>
                                        <Input type="date" name="date" id="Date" placeholder="date placeholder" onChange={(e) => { setdate(e.target.value) }} />
                                    </Col>

                                    <Label md={{ size: 1, offset: 1 }} htmlFor="Time">Time</Label>
                                    <Col md={4}>
                                        <Input type="time" name="time" id="Time" placeholder="time placeholder" onChange={(e) => { settime(e.target.value) }} />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Col md={{ size: 10, offset: 2 }}>
                                        <Button style={{ marginLeft: "0px" }} type="submit" color="primary" onClick={onReserve}>
                                            Reserve
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        </Col>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}
const Restaurants = ({ restaurants, onRestaurantClick, handleClick }) => {
    const [query, setQuery] = useState("")


    const restaurantslist = restaurants.filter(restaurant => {
        if (query === '') {
            return restaurant;
        } else if (restaurant.name.toLowerCase().includes(query.toLowerCase())) {
            return restaurant;
        }
    }).map((restaurant) => {
        return (
            <div key={restaurant.res_id}>
                <RenderRestaurantItem restaurant={restaurant} onRestaurantClick={onRestaurantClick} handleClick={handleClick} />
            </div>
        );
    });


    return (

        <div className="container-fluid" style={{ position: "relative", zIndex: "1" }}>

            <input id='rescard' placeholder="Enter Restaurant Name" onChange={event => setQuery(event.target.value)} />
            <div>
                {restaurantslist}


            </div>
        </div>

    );
}


export default Restaurants;