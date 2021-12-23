import React, { Component } from "react";
import "./form.css";
import Login from "./login";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    handleChange(date) {
        this.setState({
            startDate: date
        })
    }
    onFormSubmit(e) {
        e.preventDefault();
        console.log(this.state.startDate)
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit} className="signup">
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" className="form-control"></input>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" className="btn btn-primary btn-block"><Link to="/sign-in" style={{textDecoration:"none",color:"white"}}> Sign Up </Link></button>
                <p className="forgot-password text-right">
                    Already registered<Link className="nav-link" to={"/sign-in"}>Login?</Link>
                </p>
                <Switch>
            <Route path="/sign-in" component={Login} />
             </Switch>
            </form>
        );
    }
}