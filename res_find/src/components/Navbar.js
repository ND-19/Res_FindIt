import React from "react";
import styled from "styled-components";
import foodYummy from "../assets/FoodYummy.png";
import { NavLink } from "react-router-dom";

export default function Navbar() {

  const Nav = styled.nav`
  display: flex;
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

  return (
    <>
      <Nav className="navlocator">
        <div className="brand">
          <img className="img" src={foodYummy} alt="Icon" />
        </div>
        <ul className="links">
          <li>
            <NavLink exact to="/" activeStyle={{ color: "#f9c74f" }}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/locator" activeStyle={{ color: "#f9c74f" }}>
              Locator
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/login" activeStyle={{ color: "#f9c74f" }}>
              Login
            </NavLink>
          </li>
        </ul>
      </Nav>
    </>
  );
}

