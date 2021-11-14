import React, { useEffect, useState } from 'react'
// import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';


function Map() {
    const [markers, setmarkers] = useState([])
    const [city,setcity] = useState('Mumbai')
    const point1=30
    const point2=76
    const[position,setposition] = useState([19.0760, 72.8777]);
    useEffect(() => {
        async function fetchData() {
            try {
                const results = await (
                    await axios.get(`http://localhost:5000/api/distance/getdistance/${city}`)).data;
                setmarkers(results)
                console.log(markers)
                setposition([results[0].latitude,results[0].longitude])
                console.log(position)
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
        // loadUserDetails();
    }, [city]);
    const onValueChange = (e) => {
        console.log(e.target.value);
        setcity(e.target.value);
      };

    
    return (
        <div>
            <div>
            <input
            type="text"
            className="form-control"
            placeholder="City"
            value={city}
            name="city"
            onChange={(e) => onValueChange(e)}
          />
            </div>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map(marker => (

                    <Marker key={marker.res_id} position={[marker.latitude, marker.longitude]}>
                        <Popup>
                            <table>
                                <tr>
                                    <td>Name</td>
                                    <td>{marker.name}</td>
                                </tr>
                                <tr>
                                    <td>Type</td>
                                    <td>{marker.establishment}</td>
                                </tr>
                                <tr>
                                    <td>Address</td>
                                    <td>{marker.address}</td>
                                </tr>
                                <tr>
                                    <td>City</td>
                                    <td>{marker.city}</td>
                                </tr>
                                <tr>
                                    <td>Locality</td>
                                    <td>{marker.locality}</td>
                                </tr>
                                <tr>
                                    <td>Open Time</td>
                                    <td>{marker.open_time}</td>
                                </tr>
                                <tr>
                                    <td>Close Time</td>
                                    <td>{marker.close_time}</td>
                                </tr>
                                <tr>
                                    <td>Rating</td>
                                    <td>{marker.aggregate_rating}</td>
                                </tr>
                                <tr>
                                    <td>Cost for two</td>
                                    <td>{marker.average_cost_for_two}</td>
                                </tr>
                                <tr>
                                    <td>Cuisines</td>
                                    <td>{marker.cuisines}</td>
                                </tr>
                                <tr>
                                    <td>Highlights</td>
                                    <td>{marker.highlights}</td>
                                </tr>
                            </table>
                        </Popup>
                    </Marker>
                ))}
                {console.log(markers)}
            </MapContainer>
        </div>
    )
}

export default Map
