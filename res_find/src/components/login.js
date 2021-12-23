import React, { useState } from "react";
import './form.css';
import Signup from "./signup";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
const Login = () => {

    const login = async () => {

          localStorage.setItem("currentUser", 'Nityansh');

          // localStorage.setItem("currentUser", JSON.stringify(result));
          // window.location.href = "/booknow";
      };
        return (
            
            <form id="login">
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={login}> Sign In</button>
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