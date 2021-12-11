import React, { useEffect, useState, useRef,useCallback,useMemo } from 'react'
// import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import axios from 'axios';
import Restaurants from '../components/RestaurantCard';
import L from 'leaflet';
import iconhome from '../resources/home.svg'
import iconres from '../resources/restaurant.svg'

function DraggableMarker({dragposition,setdragposition,setp1,setp2}) {
    const customMarkerHome = L.icon({ iconUrl: iconhome,iconSize: [38, 95], })
    // console.log(customMarker)
    const [draggable, setDraggable] = useState(false)
    // const [position, setPosition] = useState(center)
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setdragposition(marker.getLatLng())
            setp2(marker.getLatLng().lat)
            setp1(marker.getLatLng().lng)
          }
        },
      }),
      [],
    )
    const toggleDraggable = useCallback(() => {
      setDraggable((d) => !d)
    }, [])
  
    return (
      <Marker
      icon={customMarkerHome}
        draggable={draggable}
        eventHandlers={eventHandlers}
        position={dragposition}
        ref={markerRef}>
        <Popup minWidth={90}>
          <span onClick={toggleDraggable}>
            {draggable
              ? 'Marker is draggable'
              : 'Click here to make marker draggable'}
          </span>
        </Popup>
      </Marker>
    )
  }
function Map() {
    const customMarkerRes = L.icon({ iconUrl: iconres,iconSize: [38, 95], })
    const [markers, setmarkers] = useState([])
    const [p1, setp1] = useState()  //longitude
    const [p2, setp2] = useState()  //latitude
    const [radius, setradius] = useState(1)
    const [city, setcity] = useState('Mumbai')
    const [cities, setcities] = useState([])
    // const point = `POINT(${p1} ${p2})`
    const [position, setposition] = useState([0, 0]);
    const [dragposition, setdragposition] = useState([0, 0]);
    //Get users location
    useEffect(() => {
        // if (!navigator.geolocation) {
        //     console.log('Geolocation is not supported by your browser');
        // } else {
        //     console.log('Locating...');
        //     navigator.geolocation.getCurrentPosition((position) => {
        //         setp2(position.coords.latitude);
        //         setp1(position.coords.longitude);
        //         setposition([position.coords.latitude, position.coords.longitude])
        //     }, () => {
        //         console.log('Unable to retrieve your location');
        //     });
        // }
        AtHome();
    }, [])

    const [point, setpoint] = useState(`POINT(${p1} ${p2})`)


    // Set the cities and initially get those restaurants which are near user's location
    useEffect(() => {
        async function fetchData() {
            try {
                const output = await (
                    await axios.get(`http://localhost:5000/api/distance/getallcities`)).data;
                setcities(output)
                // console.log(cities)
                const results = await (
                    await axios.get(`http://localhost:5000/api/distance/getdistance/${point}`)).data;
                setmarkers(results)
                let newposition = [...position]

                newposition[0] = results[0].latitude.toPrecision(4)
                newposition[1] = results[0].longitude.toPrecision(4)
                // console.log(newposition)

                setposition(newposition)
                setdragposition(newposition)
            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
        // loadUserDetails();
    }, [point]);

    const AtHome = () => {
        if (!navigator.geolocation) {
            console.log('Geolocation is not supported by your browser');
        } else {
            console.log('Locating...');
            navigator.geolocation.getCurrentPosition((position) => {
                setp2(position.coords.latitude);
                setp1(position.coords.longitude);
                setposition([position.coords.latitude, position.coords.longitude])
                setdragposition([position.coords.latitude, position.coords.longitude])
            }, () => {
                console.log('Unable to retrieve your location');
            });
        }
    }
    //To get all the restaurants within certain radius from a selected restaurant
    const handleClick = (id) => {
        setradius(radius)
        async function fetchData() {
            try {
                const results = await (
                    await axios.get(`http://localhost:5000/api/distance/distancewithin/${id}/${radius}`)).data;
                setmarkers(results)


            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    };

    const onRestaurantClick = (lat, long) => {
        console.log(lat, long)
        setposition([lat, long]);
    }

    const handleSubmit = () => {
        setcity(city)
        async function fetchData() {

            try {
                const results = await (
                    await axios.get(`http://localhost:5000/api/distance/getrestaurants/${city}`)).data;
                setmarkers(results)
                let newposition = [...position]
                newposition[0] = results[0].latitude.toPrecision(4)
                newposition[1] = results[0].longitude.toPrecision(4)

                setp1(newposition[1])
                setp2(newposition[0])
                console.log(`${p1} ${p2}`)
                setposition(newposition)
                setdragposition(newposition)

            } catch (error) {
                console.log(error);

            }
        }
        fetchData();
    }
    function ChangeMapView({ position }) {
        const map = useMap();
        map.setView(position, map.getZoom());

        return null;
    }


    return (
        <div className="box">
            <div id="map">
                <div>
                    <select value={city} onChange={(e) => setcity(e.target.value)}>
                        <option> Select User</option>
                        {
                            cities.map((city) => (<option key={city.city} value={city.city}>{city.city}</option>))
                        }
                    </select>
                    <button onClick={handleSubmit}>Click</button>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Point1"
                        value={p1}
                        name="point1"
                        onChange={(e) => setp1(e.target.value)}
                    />
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Point2"
                        value={p2}
                        name="point2"
                        onChange={(e) => setp2(e.target.value)}
                    />

                    <button onClick={() => {
                        setpoint(`POINT(${p1} ${p2})`)
                    }}>Click</button>
           
                    <button onClick={AtHome}>Home</button>
                </div>
                {/* {console.log(position)} */}

                <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                    <ChangeMapView position={position} />
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map(marker => (

                        <Marker key={marker.res_id} icon={customMarkerRes} position={[marker.latitude, marker.longitude]}>
                            <Popup>
                                <table>
                                    <tbody>
                                        {marker.distance && (<tr>
                                            <td>Distance from current location</td>
                                            <td>{marker.distance.toPrecision(2)} km</td>
                                        </tr>)}

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
                                    </tbody>
                                </table>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Radius"
                                    value={radius}
                                    name="radius"
                                    onChange={(e) => setradius(e.target.value)}
                                />
                                <button onClick={() => handleClick(parseInt(marker.res_id))}>Click</button>
                            </Popup>
                        </Marker>
                    ))}
                    <DraggableMarker dragposition={dragposition} setdragposition={setdragposition} setp1={setp1} setp2={setp2}/>
                    {/* {console.log(position)} */}
                </MapContainer>
            </div>
            <div className="scroll">
                <Restaurants restaurants={markers} onRestaurantClick={onRestaurantClick} />
            </div>
        </div>
    )
}

export default Map
