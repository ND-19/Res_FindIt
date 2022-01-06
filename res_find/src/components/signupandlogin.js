import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './authentication.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./login";
import SignUp from "./signup";
function Form() {
  return (<Router>
    <div className="Form">

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/login' component={Login} />
            {/* <Route path="/sign-in" component={Login} /> */}
            <Route exact path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default Form;