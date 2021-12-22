import React,{useState} from 'react';
import { Card, CardImg, CardBody, CardText, CardHeader, Button } from 'reactstrap';
import img from '../resources/restaurant.jpg';
function RenderRestaurantItem({ restaurant, onRestaurantClick }) {

    return (
        // <Card>
        //     <CardImg style={{width:"200px"}} src={img} alt={restaurant.name} />
        //     <CardImgOverlay>
        //       <CardTitle><strong>{restaurant.name}</strong></CardTitle>
        //     </CardImgOverlay>
        // </Card>

        <Card key={restaurant.res_id} className="card" >
            <CardHeader tag="h3" className="card-header">{restaurant.name}</CardHeader>
            <CardBody style={{ textAlign: "center" }}>
                <CardImg style={{ width: "100%", height: "200px" }} src={img} alt={restaurant.name} />

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
                            <td>{restaurant.open_time}</td>
                        </tr>
                        <tr>
                            <td>Close Time</td>
                            <td>{restaurant.close_time}</td>
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
            </CardBody>
            <Button
                onClick={() => {
                    onRestaurantClick(restaurant.latitude, restaurant.longitude);
                }}
                style={{ width: "100%", backgroundColor: "lightcoral" }}
            >Locate</Button>
        </Card>
    );
}
const Restaurants = ({ restaurants, onRestaurantClick }) => {
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
                <RenderRestaurantItem restaurant={restaurant} onRestaurantClick={onRestaurantClick} />
            </div>
        );
    });

    return (
        <div className="container">
            <input placeholder="Enter Restaurant Name" onChange={event => setQuery(event.target.value)} />
            <div className="row">
                {restaurantslist}
            </div>
        </div>
    );
}


export default Restaurants;