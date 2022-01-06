import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/Navbar';
import Locator from './screens/map.js'
import Footer from './components/Footer';
import Hero from './components/Hero';
import ScrollToTop from './components/ScrollToTop';
import Services from './components/Services';
import scrollreveal from "scrollreveal";
import Form from "./components/signupandlogin";
import SignUp from "./components/signup";
import Profile from './components/Profile'

function App() {
  useEffect(() => {
    const sr = scrollreveal({
      origin: "top",
      distance: "80px",
      duration: 2000,
      reset: false,
    });
    sr.reveal(
      `
        nav,
        #home,
        #services,
        #portfolio,
        .footer,
        #login,
        .signup
    `,
      {
        opacity: 0,
        interval: 200,
      }
    );
  }, []);

  const Home = () => {
    return (
      <>

      <ScrollToTop/>
      <Hero/>
      <Services/>
      </>
    )
  }
  return (
    <div className="App">
       
      <Router>
      
      <NavBar/>
        
      <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/profile" component={Profile}/>
      <Route  exact path="/login" component={Form}/>
      <Route exact path="/locator" component={Locator} />
      </Switch>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;