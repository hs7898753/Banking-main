/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home" css={CSS}>
      <div className="banner">
        <div className="headline">
          <h1>Welcome to Elite Capital Bank!</h1>
        </div>
      </div>
      <div className="services__banner">
        <h1>Our Services</h1>
        <a className="button" href="#services">
          <ion-icon name="chevron-down-circle"></ion-icon>
        </a>
      </div>
      <div className="services" id="services">
        <Link to="/transfer">
          <div className="item">
            <div className="image">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <div className="title">
              <h3>Make Transaction</h3>
            </div>
          </div>
        </Link>
        <Link to="/transactions-history">
          <div className="item">
            <div className="image">
              <i className="fas fa-history"></i>
            </div>
            <div className="title">
              <h3>Transaction History</h3>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

const CSS = css`
  font-family: "Roboto", sans-serif;
  background-color: cream;

  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    justify-content: center;
    padding: 15px;
    height: 25vh;
    color: red;

    .headline {
      
      
      h1 {
        font-size: 38px;
        font-weight: 900;
        color: darkblue;
      }
      p {
        color: blue;
        font-size: 20px;
        font-weight: 500;
        text-decoration: underline;
      }
    }
    }
  }

  @media screen and (max-width: 780px) {
    .banner {
      flex-direction: column;
      justify-content: space-around;
      height: 100vh;

      .headline {
        margin-left: 10px;
        flex: unset;
        h1 {
          font-size: 56px;
        }
      }

      .image {
        position: unset;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .services__banner {
    height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    background: rgba(255, 255, 255, 0.3);

    h1 {
      font-size: 78px;
      font-family: "Marck Script", cursive;
      color: var(--navy-blue);
    }
    a {
      color: var(--powder-blue);
      padding: 0px 2.5px;
      border-radius: 180px;
      background: var(--navy-blue);
      box-shadow: 1px 1px 25px 0px rgba(0, 0, 0, 0.75);
      -webkit-box-shadow: 1px 1px 25px 0px rgba(0, 0, 0, 0.75);
      -moz-box-shadow: 1px 1px 25px 0px rgba(0, 0, 0, 0.75);
      transition: all 0.3s ease;

      :hover {
        color: var(--navy-blue);
        background: var(--power-blue);
        transform: scale(1.4);
        box-shadow: unset;
        -webkit-box-shadow: unset;
        -moz-box-shadow: unset;
      }

      ion-icon {
        padding-top: 3px;
        font-size: 50px;
      }
    }
  }

  .services {
    padding-top: 45px;
    height: 25vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    text-decoration: none;

    a {
      height: 100%;
      display: flex;
      align-items: center;
      color: white;
      padding: 10px 0;
      text-decoration: none;
      .item {
        height: 100%;
        width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #9d0208;
        background: linear-gradient(
          180deg,
          #9d0208 0%,
          #9d0208 50%,
          #9d0208 100%
        );
        border-radius: 30px;
        padding: 0 60px;
        transition: all 0.3s ease;
        

        .image {
          i::before {
            font-size: 130px;
            padding-left: 10px;
          }
        }

        .title {
          color: white;
          text-decoration: none;
        }
      }

      .item:hover {
        background: green;
        transform: scale(1.01);
        box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
        -webkit-box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
        -moz-box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, 0.75);
      }

      @media screen and (max-width: 1100px) {
        .item {
          width: 200px;
        }
      }
    }
  }
  @media screen and (max-width: 625px) {
    .services__banner {
      h1 {
        font-size: 58px;
      }
    }
    .services {
      height: 110vh;
      flex-direction: column;
      padding-bottom: 30px;

      a {
        width: 100%;
        max-width: 350px;
        justify-content: center;

        .item {
          width: 100%;
        }
      }
    }
  }
`;

export default Home;
