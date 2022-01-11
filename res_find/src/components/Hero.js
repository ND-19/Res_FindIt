import React from "react";
import { NavLink } from "reactstrap";
import styled from "styled-components";
import hero from "../assets/hero.jpg";
import heroDesign from "../assets/HeroDesign.png";
export default function Hero() {
  return (
    <Section id="home">
      <div className="background">
        <img src={hero} alt="Background Image" />
      </div>
      <div className="content">
        <div className="sale">
          <img src={heroDesign} alt="" />
          <h1>
            BIG SALE
            <span>50% OFF</span>
          </h1>
        </div>
        <div className="info">
          <h2>RETAILER</h2>
          <em>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            aspernatur itaque, eius quia voluptas numquam!
          </em>
          <a className= "reserve" href={JSON.parse(localStorage.getItem("currentUser")) ? "/locator" : "/login"}>RESERVE NOW</a>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  height: 110vh;
  width: 100vw;
  top: -70px;
  z-index: 5;
  position: relative;
  .background {
    height: 100%;
    img {
      z-index: -50;
      object-fit: cover;
      width: 100%;
      height: 100%;
      filter: brightness(60%);
    }
  }
  .content {
    position: absolute;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    width: 100%;
    .sale {
      position: relative;
      left: 10%;
      img {
        height: 70vh;
      }
      h1 {
        color: white;
        position: absolute;
        top: 25vh;
        left: 15vh;
        font-size: 4.5rem;
        span {
          display: block;
          font-size: 5vw;
        }
      }
    }
    .info {
      z-index: 5;
      position: relative;
      top: 30%;
      right: 10%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 1rem;
      h2 {
        color: #f9c74f;
        font-size: 4rem;
        letter-spacing: 0.5rem;
      }
      em {
        color: white;
        width: 60%;
        text-align: end;
        font-size: 1.1rem;
        line-height: 2rem;
        letter-spacing: 0.1rem;
      }
      }
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    .content {
      flex-direction: column;
      .sale {
        display: none;
      }
      .info {
        top: 25%;
        h2 {
          font-size: 2rem;
        }
        em {
          width: 90%;
        }
      }
    }
  }
`;