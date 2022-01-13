import React, { useState, useEffect } from "react";
// import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { TabContent, Row, Card, Button, CardText, Table, Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Col, FormFeedback, Nav, NavItem, NavLink, TabPane, Progress } from 'reactstrap';
import axios, { post } from "axios";
import Swal from "sweetalert2";
import classnames from 'classnames'
import ReactStars from "react-rating-stars-component";


const Profile = () => {
    const [currentActiveTab, setCurrentActiveTab] = useState('1');

    // Toggle active state for Tab
    const toggle = tab => {
        if (currentActiveTab !== tab) setCurrentActiveTab(tab);
    }
    const user = JSON.parse(localStorage.getItem("currentUser"));
    useEffect(() => {
        if (!user) {
            window.location.href = "/login";
        }
    }, []);
    const date = user.dob.split('-');


    return (
        <div className="mt-3 ml-3 mr-3 bs profile-box">
            <h1 className="text-center" style={{ fontSize: "30px" }}>
                <b>User Profile Panel</b>
            </h1>
            <Nav style={{ cursor: "pointer" }} tabs>

                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '1'
                        })}
                        onClick={() => { toggle('1'); }}
                    >
                        Profile
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({
                            active:
                                currentActiveTab === '2'
                        })}
                        onClick={() => { toggle('2'); }}
                    >
                        My Bookings
                    </NavLink>

                </NavItem>


            </Nav>

            <TabContent activeTab={currentActiveTab}>
                <TabPane tabId="1">

                    <div className=" card text-center" style={{ width: "18rem" }}>
                        {/* <img
                                src={ }
                                class="card-img-top"
                                alt="..."
                            /> */}
                        <div className="card-body">
                            <h5 className="card-title">
                                <b>Name</b>: {user.firstName + " " + user.lastName}
                            </h5>
                            <h5 className="card-title">
                                <b>Email:</b> {user.email}
                            </h5>
                            <h5 className="card-title">
                                <b>dob:</b> {date[2]}-{date[1]}-{date[0]}
                            </h5>
                        </div>
                    </div>


                </TabPane>
                <TabPane tabId="2">

                    <MyBookings />

                </TabPane>

            </TabContent>

        </div>
    );
};

export default Profile;

export function MyBookings() {
    const [bookings, setbookings] = useState([]);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState();
    const [modal, setmodal] = useState(false)
    const [avgcost, setavgcost] = useState();
    const [progress, setProgress] = useState()
    const [file, setfile] = useState(null)
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [touched, settouched] = useState({
        rating: false,
        review: false,
        dropdownValue: false,
        avgcost: false
    })

    const validate = (rating, review) => {
        const errors = {
            rating: '',
            review: '',
            avgcost: ''
        };
        if (touched.rating && (rating < 0 || rating > 5))
            errors.rating = 'Ratings should be a number b/w 0 to 5';

        if (touched.review && review.length === 0)
            errors.review = 'Review should not be empty';

        const reg = /^\d+$/;
        if (touched.avgcost && !reg.test(avgcost))
            errors.avgcost = 'Average cost should contain only numbers';

        if (touched.avgcost && (avgcost < 0))
            errors.avgcost = 'Average cost should not be negative';

        return errors;
    }
    const errors = validate(rating, review);


    useEffect(() => {

        async function fetchdata() {
            try {
                const data = await (
                    await axios.get(`/api/bookings/users/${user._id}`)
                ).data;
                console.log(data);
                setbookings(data.bookings);

            } catch (error) {
                console.log(error);
            }
        }
        fetchdata();
    }, []);



    const onFormSubmit = (e, name) => {

        e.preventDefault();

        const url = `/image/${name}`;

        const formData = new FormData();

        formData.append('image', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            },
            onUploadProgress: data => {
                //Set the progress value to show the progress bar

                setProgress(Math.round((100 * data.loaded) / data.total))
            },
        }
        post(url, formData, config)
            .then((response) => {
                alert(response.data.msg);
                setTimeout(() => {
                    setProgress("0")
                }, 5000);
            })

    }


    async function addreview(e, bookingId, restaurantId) {
        e.preventDefault();
        try {
            const result = await (
                await axios.post("/api/bookings/reviews/addreview", {
                    bookingId,
                    rating,
                    review,
                    avgcost,
                    restaurantId
                })
            ).data;

            //   setloading(false);
            Swal.fire(
                "Congratulations",
                "Your review has been added successfully",
                "success"
            ).then((result) => {
                window.location.reload();
            });
        } catch (error) {
            console.log(error);
            //   setloading(false);
            Swal.fire("Oops", "Something went wrong", "error");
        }

    }



    return (
        <div /*className="row"*/>

            <h1 className="text-center">My Bookings</h1>


            {bookings.length &&
                bookings.map((booking) => {
                    return (
                        <div className="container text-center" key={booking._id}>
                            <Card inverse style={{ padding: -30, border: "none" }}>
                                <CardText className="offset-md-1 col-md-10 col-sm-12" style={{ borderColor: '#333' }}>
                                    <Table style={{ margin: 0, padding: 0, boxSizing: "border-box", border: "1px solid black" }}>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Time</th>
                                                <th>Number of People</th>
                                                <th>Restaurant Name</th>
                                                <th>Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="profile">
                                                <td> {booking.date}</td>
                                                <td>{booking.time}</td>
                                                <td>{booking.numberOfPeople}</td>
                                                <td>{booking.restaurant.name}</td>
                                                <td>
                                                    <Button onClick={() => { setmodal(!modal) }}>
                                                        Add Review
                                                    </Button>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </CardText>
                            </Card>
                            <br />

                            {/* Modal Starts */}
                            <Modal isOpen={modal} toggle={() => { setmodal(!modal) }} className='modal-lg'>
                                <ModalHeader toggle={() => { setmodal(!modal) }}>Add Review</ModalHeader>
                                <ModalBody>
                                    <div className='row row-content'>
                                        <Col sm={{ size: 12 }} md={{ size: 12 }}>

                                            <Form onSubmit={(e) => { e.preventDefault() }}>
                                                <FormGroup row>
                                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                                    <Col md={10}>
                                                        <ReactStars
                                                            count={5}
                                                            onChange={(newRating) => {
                                                                setRating(newRating)
                                                            }}
                                                            size={24}
                                                            isHalf={true}
                                                            emptyIcon={<i className="far fa-star"></i>}
                                                            halfIcon={<i className="fa fa-star-half-alt"></i>}
                                                            fullIcon={<i className="fa fa-star"></i>}
                                                            activeColor="#ffd700"
                                                        />



                                                        <FormFeedback>{errors.rating}</FormFeedback>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label htmlFor="review" md={2}>Review</Label>
                                                    <Col md={10}>
                                                        <Input type="text" id="review" name="review"
                                                            placeholder="Add a review for the restaurant"
                                                            value={review}
                                                            valid={errors.review === ''}
                                                            invalid={errors.review !== ''}
                                                            onBlur={() => { settouched({ ...touched, review: true }) }}
                                                            onChange={(e) => { setReview(e.target.value) }} />
                                                        <FormFeedback>{errors.review}</FormFeedback>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label htmlFor="avgcost" md={2}>Average Cost for Two</Label>
                                                    <Col md={10}>
                                                        <Input type="text" id="cost" name="avgcost"
                                                            placeholder="Average cost for two:"
                                                            value={avgcost}
                                                            valid={errors.avgcost === ''}
                                                            invalid={errors.avgcost !== ''}
                                                            onBlur={() => { settouched({ ...touched, avgcost: true }) }}
                                                            onChange={(e) => { setavgcost(e.target.value) }} />
                                                        <FormFeedback>{errors.avgcost}</FormFeedback>
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label htmlFor="file" md={2}>File Upload</Label>
                                                    <Col md={10}>

                                                        <Input type="file" id="file" name="image"
                                                            placeholder="Upload the images for the restaurant"
                                                            onChange={(e) => setfile(e.target.files[0])} />
                                                        <Button style={{ marginLeft: "0px", marginBottom: "10px" }} type="submit" color="danger" onClick={(e) => { onFormSubmit(e, booking.restaurant.name) }}>


                                                            Upload File
                                                        </Button>
                                                        {progress && <Progress animated value={progress} >{progress} % </Progress>}
                                                    </Col>
                                                </FormGroup>


                                                <FormGroup row>

                                                    <Col md={{ size: 10, offset: 2 }}>
                                                        <Button style={{ marginLeft: "0px", marginTop: "0px" }} type="submit" color="primary" onClick={(e) => { addreview(e, booking._id, booking.restaurantId) }}>
                                                            Add Review
                                                        </Button>
                                                    </Col>

                                                </FormGroup>



                                            </Form>
                                        </Col>
                                    </div>
                                </ModalBody>
                            </Modal>
                            {/* Modal Ends */}
                        </div>
                    );
                })}
         
        </div>
    );
}       
