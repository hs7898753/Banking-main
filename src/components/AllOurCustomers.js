/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { db } from "./firebase";
import { Link } from "react-router-dom";

function AllOurCustomers() {
  const [state, setState] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
      db
        .collection("users")
        .orderBy("Name")
        .onSnapshot((snapshot) =>
          setState(
            snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
          )
        )
  };
  
  return (
    <div className="allOurCustomers" css={CSS}>
      <h1>All Our Customers</h1>
      <div className="table">
        <table>
          <thead>
            <tr key={"id-1"}>
              <td>UID</td>
              <td>Name</td>
              <td>Account Number</td>
              <td>Current Balance</td>
              <td><ion-icon name="cash-outline"></ion-icon></td>
            </tr>
          </thead>
          <tbody>
            {state.map((obj, i) => (
              <tr key={`id${i}`} className={i%2===0 ? "" : "light"}>
                <td>{i+1}</td>
                <td>{obj.data.Name}</td>
                <td>{obj.data.AccountNo}</td>
                <td>{obj.data.Balance}</td>
                <td><Link to="/transfer">Transfer Money</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const CSS = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: cream;
  background: linear-gradient(
    180deg,
    cream 0%,
    cream 50%,
    cream 100%
  );
  font-family: "Roboto", sans-serif;

  h1 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    font-size: 3rem;
    color: var(--star-command-blue);
    text-decoration: none;
  }

  @media screen and (max-width: 400px) {
    h1 {
      font-size: 2.5rem;
    }
  }

  .table {
    display: table;
    overflow: scroll;
    height: 100vh;

    table {
      table-layout: fixed;
      color: var(--powder-blue);
      margin: 2rem 0;
      border-collapse: collapse;
      border: 5px solid black;

      thead {
        background-color: var(--navy-blue);

        tr {
          td {
            padding: 10px;
            text-align: center;
            font-weight: 700;

            ion-icon {
              font-size: 20px;
            }
          }
        }
      }

      tbody {
        background-color: var(--cerulean-crayola);

        tr {
          a{
            color: #BF0000;
            transition: all 0.3s ease;
          }

          a:hover {
            text-decoration: underline;
          }

          td {
            padding: 10px;
            border-right: 1px solid var(--navy-blue);
            text-align: right;
          }
        }

        .light {
          background-color: var(--sky-blue-crayola);
        }
      }
    }
  }
`;

export default AllOurCustomers;

// {Array.from(Object.values(database)).map(arr => arr.map(e => (<p>{e}</p>)))}
