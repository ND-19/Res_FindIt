import React, { useState } from "react";
import './form.css';
import Signup from "./signup";
// import Locater from "../screens/map.js"
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const Confirm = (e) => {
        e.preventDefault();
        console.log(email,password)
        async function fetchData() {
            try {
                const results = await(
                    await axios.post(`/api/users/user/`,{email,password})).data;
                    localStorage.setItem("currentUser", JSON.stringify(results));
                    if (JSON.parse(localStorage.getItem("currentUser"))) {
                        window.location.href = "/locator";
                      } else {
                        //   console.log("sahil");
                        alert("Invalid credentials")
                      }
                    console.log(results);
            } catch (error) {
                console.log(error);
    
            }
        }
        fetchData();
    }
    // const login = async () => {

    //       localStorage.setItem("currentUser", 'Nityansh');

    //       // localStorage.setItem("currentUser", JSON.stringify(result));
    //       // window.location.href = "/booknow";
    //   };
        return (
            
            <form id="login">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {setemail(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {setpassword(e.target.value)}}/>
                </div>

                <button className="btn btn-primary btn-block" onClick={(e) => {Confirm(e)}}> Sign In</button>
                <p className="forgot-password text-right">
                    Don't have an account<Link className="nav-link" to={"/sign-up"}>Signup?</Link>
                </p>
                <Switch>
            <Route path="/sign-up" component={Signup} />
             </Switch>
             {console.log(localStorage.getItem("currentUser"))}
            </form>
        );
    }
export default Login;