import React from "react";
import styled from "styled-components";
import Services1 from "../assets/Services1.png";
import Services2 from "../assets/Services2.png";
import Services3 from "../assets/Services3.png";
import { TitleStyles } from "./ReusableStyles";
export default function Services() {
  return (
    <Section id="services">
      <div className="title">
        <h1 className="yellow">What we do?</h1>
        <p>
        Customers use our platform to search and discover restaurants, write reviews and view and upload photos and book a table at a restaurant.
        </p>
      </div>
      <div className="services">
        <div className="service">
          <img src={Services2} alt="" />
          <p>
             <span>Chef's</span><br/>
             Passionate about food and cooking and enjoy the whole process of procuring, preparing, cooking and serving food.
          </p>
          <button>Read More</button>
        </div>
        <div className="service yellow">
          <img src={Services1} alt="" />
          <p>
            <span>Food</span><br/>
            Tasty, appetizing, scrumptious, yummy, luscious, delectable, mouth-watering, fit for a king, delightful, lovely, wonderful, pleasant, enjoyable, appealing, enchanting, charming.
          </p>
          <button>Read More</button>
        </div>
        <div className="service">
          <img src={Services3} alt="" />
          <p>
            <span>Drinks</span><br/>
            Warm up your parties or family gatherings with hot chocolate, flavored coffee, spiced tea, apple cider, slow cooker juice mixes and more.
          </p>
          <button>Read More</button>
        </div>
      </div>
    </Section>
  );
}

const Section = styled.section`
  margin: 0rem 4rem;
  margin-bottom: 2rem;
  ${TitleStyles};
  .services {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10vw;
    margin-top: 4rem;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5vw;
      padding: 0 3vw;
      img {
        height: 2.8rem;
      }
      p {
        text-align: center;
        line-height: 2rem;
        font-size: 1.1rem;
        letter-spacing: 0.1rem;
      }
      button {
        padding: 0.6rem 3rem;
        letter-spacing: 0.2rem;
        border-radius: 2rem;
        font-size: 1.1rem;
        border: none;
        color: white;
        background-color: #fc4958;
        transition: 0.3s ease-in-out;
        &:hover {
          background-color: #f9c74f;
        }
      }
    }
    .yellow {
      button {
        background-color: #f9c74f;
        &:hover {
          background-color: #fc4958;
        }
      }
    }
  }
  @media screen and (min-width: 260px) and (max-width: 1080px) {
    margin: 2rem;
    .services {
      grid-template-columns: 1fr;
    }
  }
`;