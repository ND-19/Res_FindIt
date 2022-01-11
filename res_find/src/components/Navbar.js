import React from "react";
import styled from "styled-components";
import foodYummy from "../assets/FoodYummy.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {

  const Nav = styled.nav`
  display: flex;
  z-index: 100;
  position: relative;
  justify-content: space-between;
  align-items: center;
  padding: 0 4vw;
  .brand {
    img {
      margin-top: 1rem;
      cursor: pointer;
    }
    .toggle {
      display: none;
    }
  }
  .links {
    display: flex;
    list-style-type: none;
    gap: 2rem;
    li {
      a{
        color: #fc4958;
        font-weight: 600;
        text-decoration: none;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        transition: 0.3s ease-in-out;
        &:hover {
          color: #f9c74f;
        }
      }
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    .brand {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      top: 0;
      .toggle {
        display: block;
      }
    }
    .links {
      display: none;
    }
  }
`;

const user = JSON.parse(localStorage.getItem("currentUser"));
const logout = () => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
};

  return (
    <>
      <Nav className="navlocator">
        <div className="brand">
          <img className="img" src={foodYummy} alt="Icon" />
        </div>
        <ul className="links">
          <li>
            <NavLink exact to="/" activeStyle={{ 
color: "#f9c74f"}}>
              <h5 style={{marginTop: "13px"}}>HOME</h5>
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/locator" activeStyle={{ 
color: "#f9c74f" }}>
            <h5 style={{marginTop: "13px"}}>LOCATOR</h5>
            </NavLink>
          </li>
          <li>
          
            {user ? (
              <>
                {/* <h1>{user.name}</h1> */}
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ marginLeft: "15px" }}
                  >
                    <i className="fa fa-user"></i> {user.firstName}
                  </button>
                  <ul
                    style={{zIndex:"5"}}
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li>
                      <a className="dropdown-item" href="/profile">
                        My Profile
                      </a>
                    </li>
                    
                    <li>
                      <a className="dropdown-item" href="/login" onClick={logout}>
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                to="/login"
                activeStyle={{ 
                  color: "#f9c74f" }}
              >
                <h5 style={{marginTop: "13px"}}>LOGIN</h5>
              </NavLink>
            )}
          
          </li>
        </ul>
      </Nav>
    </>
  );
}