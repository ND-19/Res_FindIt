import React, { useState, useEffect } from "react";
// import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import { Card, Button, CardText, Table,Modal, ModalBody, ModalHeader, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';
import axios, { post } from "axios";
import Swal from "sweetalert2";
import { Tabs } from 'antd';
import ReactStars from "react-rating-stars-component";
import { render } from "react-dom";

const { TabPane } = Tabs;



const Profile = () => {
   
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
            <div className="container" >
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Profile" key="1">
                        <div class=" card text-center" style={{ width: "18rem" }}>
                            <img
                                src="data:image/jpeg;base64,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"
                                class="card-img-top"
                                alt="..."
                            />
                            <div class="card-body">
                                <h5 class="card-title">
                                    <b>Name</b>: {user.firstName + " " + user.lastName}
                                </h5>
                                <h5 class="card-title">
                                    <b>Email:</b> {user.email}
                                </h5>
                                <h5 class="card-title">
                                    <b>dob:</b> {date[2]}-{date[1]}-{date[0]}
                                </h5>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab="Bookings" key="2">
                        <MyBookings />
                    </TabPane>
                </Tabs>
            </div>
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
    const [file, setfile] = useState(null)
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const [touched, settouched] = useState({
        rating: false,
        review: false,
        dropdownValue: false
    })
    const validate = (rating, review) => {
        const errors = {
            rating: '',
            review: '',
        };
        if (touched.rating && (rating<0 || rating>5))
            errors.rating = 'Ratings should be a number b/w 0 to 5';

        if (touched.review && review.length===0)
            errors.review = 'Review should not be empty';
        return errors;
    }
    const errors = validate(rating, review);
    
    
    useEffect(() => {
        async function fetchdata() {
            try {
                const data = await (
                    await axios.get(`http://localhost:5000/api/bookings/users/${user._id}`)
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
        e.preventDefault()
        const url = `http://localhost:5000/image/${name}`;
        
        const formData = new FormData();
        
        formData.append('image', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        post(url, formData, config)
            .then((response) => {
                alert(response.data.msg);
            })
    }

          async function addreview(bookingId, restaurantId) {
            try {
              const result = await (
                await axios.post("http://localhost:5000/api/bookings/reviews/addreview", {
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
                            <div className="" key={booking._id}>
                                <Card inverse style={{ borderColor: '#333', padding: -30 }}>
                                  <CardText>
                                  <Table style={{margin: 0, padding:0, boxSizing:"border-box"}}>
                                    <thead>
                                      <tr>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Number of People</th>
                                        <th>Address</th>
                                        <th>Rating</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td> {booking.date}</td>
                                        <td>{booking.time}</td>
                                        <td>{booking.numberOfPeople}</td>
                                        <td>{booking.restaurant.address}</td>
                                        <td>
                                          <Button onClick={()=>{setmodal(!modal)}}>
                                            Add Review
                                          </Button>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </Table>
                                  </CardText>
                                </Card>
                                <br/>

                                {/* Modal Starts */}
                                <Modal isOpen={modal} toggle={() => { setmodal(!modal) }} className='modal-lg'>
                                <ModalHeader toggle={() => { setmodal(!modal) }}>Add Review</ModalHeader>
                                <ModalBody>
                                    <div className='row row-content'>
                                        <Col sm={{ size: 12 }} md={{ size: 12 }}>
                                            <Form onSubmit={(e)=>{e.preventDefault()}}>
                                                <FormGroup row>
                                                    <Label htmlFor="rating" md={2}>Rating</Label>
                                                    <Col md={10}>
                                                            <ReactStars
                                                              count={5}
                                                              onChange={(newRating) => {
                                                                console.log(newRating);
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
                                                    <Label htmlFor="review" md={2}>review</Label>
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
                                                    <Label htmlFor="file" md={2}>File Upload</Label>
                                                    <Col md={10}>
                                                        <Input type="file" id="file" name="image"
                                                            placeholder="Upload the images for the restaurant"
                                                            onChange={(e) => setfile(e.target.files[0])} />
                                                        <Button style={{marginLeft:"0px"}} type="submit" color="danger" onClick={(e)=>{onFormSubmit(e,booking.restaurant.name)}}>
                                                            Upload File
                                                        </Button>
                                                    </Col>
                                                </FormGroup>
                                                {/* <FormGroup row>
                                                    <Col md={{ size: 10, offset: 2 }}>
                                                        <Button style={{marginLeft:"0px"}} type="submit" color="primary" onClick={()=>{addreview(booking._id, booking.restaurantId)}}>
                                                            Add Review
                                                        </Button>
                                                    </Col>
                                                </FormGroup> */}
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