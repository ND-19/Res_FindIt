import React from "react";
import styled from "styled-components";
import foodYummy from "../assets/FoodYummy.png";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.css"

export default function Navbar() {


  const user = JSON.parse(localStorage.getItem("currentUser"));
  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  };

  return (
    <>
       <nav className="navlocator Nav navbar navbar-expand-lg">
        <div className="brand d-inline">
          <img className="img" src={foodYummy} alt="Icon" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fa-solid fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
         {/* Navbar collapse */}
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto links">
              <li>
                <NavLink exact to="/" className ="navlink" activeStyle={{color: "#f9c74f"}}>
                  <h5 style={{ marginTop: "13px"}}>HOME</h5>
                </NavLink>
              </li>
              <li>
                <NavLink exact to="/locator" className="navlink" activeStyle={{ color: "#f9c74f" }}>
                  <h5 style={{ marginTop: "13px" }}>LOCATOR</h5>
                </NavLink>
              </li>
              <li>

                {user ? (
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle d-inline"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        
                      >
                        <i className="fa fa-user"></i> {user.firstName}
                      </button>
                      <ul
                        style={{ zIndex: "5", width:"fit-content"}}
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li className="navlink" style={{marginLeft:"0px"}}>
                          <a className="dropdown-item" href="/profile">
                            My Profile
                          </a>
                        </li>

                        <li className="navlink" style={{marginLeft:"0px"}}>
                          <a className="dropdown-item" href="/login" onClick={logout}>
                            Logout
                          </a>
                        </li>
                      </ul>
                    </div>
                ) : (
                  <NavLink to="/login" activeStyle={{color: "#f9c74f"}} className = "navlink">
                    <h5 style={{ marginTop: "13px" }}>LOGIN</h5>
                  </NavLink>
                )}

              </li>
            </ul>
            </div>
      </nav>
    </>
  );
}

