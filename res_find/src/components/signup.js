import React ,{useState} from "react";
import "./form.css";
import Login from "./login";
import { BrowserRouter as Switch, Route, Link } from "react-router-dom";
import axios from 'axios';

const SignUp = () => {
const [firstName, setfirstname] = useState('')
const [lastName, setlastname] = useState('')
const [email, setemail] = useState('')
const [password, setpassword] = useState('')
const [dob, setdob] = useState('')
const onFormSubmit = () => {
    async function fetchData() {
        try {
            const results = await(
                await axios.post(`http://localhost:5000/api/users/`,{firstName,lastName,dob,email,password})).data;
                console.log(results)

        } catch (error) {
            console.log(error);

        }
    }
    fetchData();
}
        return (
            <form className="signup">
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" className="form-control" placeholder="First name" onChange={(e) => {setfirstname(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" className="form-control" placeholder="Last name" onChange={(e) => {setlastname(e.target.value)}}/>
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" className="form-control" onChange={(e) => {setdob(e.target.value)}}></input>
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={(e) => {setemail(e.target.value)}}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={(e) => {setpassword(e.target.value)}}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block" onClick={onFormSubmit}><Link to="/sign-in" style={{textDecoration:"none",color:"white"}}> Sign Up </Link></button>
                <p className="forgot-password text-right">
                    Already registered<Link className="nav-link" to={"/sign-in"}>Login?</Link>
                </p>
                <Switch>
            <Route path="/sign-in" component={Login} />
             </Switch>
            </form>
        );
    }
export default SignUp;
