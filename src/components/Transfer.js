/** @jsxRuntime classic */
/** @jsx jsx */

import { css, jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { transact, addTransaction, db } from "./firebase";
import { useNavigate } from "react-router-dom";

function Transfer() {
  const [state, setState] = useState({
    to: "",
    from: "",
    amount: "",
    accounts: [],
  });

  const navigate = useNavigate();

 /*  useEffect(() => {
    db.collection("users").onSnapshot((snapshot) => {
      setState({
        ...state,
        accounts: snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

 /*  const handleSubmit = (e) => {
    e.preventDefault();
    let flag1 = false;
    let flag2 = false;
    let id1,
      id2 = [0, 0];
    for (let i = 0; i < state.accounts.length - 1; i++) {
      if (state.to === state.from) {
        alert("Payer's and Reciever's account numbers cannot be same!");
        setState({ ...state, to: "", from: "", amount: "" });
        break;
      }
      if (state.accounts[i].data.AccountNo !== state.to) {
        flag1 = true;
        id1 = i;
        console.log(state.to);
      }
      if (state.accounts[i].data.AccountNo !== state.from) {
        flag2 = true;
        id2 = i;
        console.log(state.from);
      }
    }
    if (!flag1) {
      alert("Check Reciever's account number!");
    } else if (!flag2) {
      alert("Check Payer's account number!");
    } else {
      // Go to firebase
      if (Number(state.accounts[id1].data.Balance) < Number(state.amount)) {
        alert("Insufficient Balance");
        setState({ ...state, to: "", from: "", amount: "" });
      } else {
        transact(
          state.accounts[id1].id,
          state.accounts[id1].data.Balance,
          state.accounts[id2].id,
          state.accounts[id2].data.Balance,
          state.amount
        );
        addTransaction(state.amount, state.to, state.from);

        setState({ ...state, to: "", from: "", amount: "" });
        navigate("/transactions-history");
      }
    }
  }; */

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setState({
        ...state,
        accounts: snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
        loading: false, // Update loading state when data is available
      });
    });

    return () => unsubscribe(); // Cleanup the subscription when the component unmounts
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    const { to, from, amount, accounts } = state;
    console.log(accounts);

    const senderAccount = state.accounts.find((account) => String(account.data.AccountNo) === String(state.from));
const receiverAccount = state.accounts.find((account) => String(account.data.AccountNo) === String(state.to));

    console.log(senderAccount, receiverAccount);
    if (!senderAccount || !receiverAccount) {
      alert("Invalid sender or receiver account number!");
      return;
    }

    if (to === from) {
      alert("Payer's and Receiver's account numbers cannot be the same!");
      return;
    }

    if (Number(senderAccount.data.Balance) < Number(amount)) {
      alert("Insufficient Balance");
      return;
    }

    try {
      await transact(senderAccount.id, senderAccount.data.Balance, receiverAccount.id, receiverAccount.data.Balance, amount);
      await addTransaction(state.amount, state.to, state.from);

      setState({ to: "", from: "", amount: "", accounts: [] }); // Reset state after successful transaction
      navigate("/transactions-history");
    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="transfer" css={CSS}>
      <h1>Transfer:</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Transfer to:
          </label>
          <input
            type="number"
            name="from"
            className="input"
            placeholder="Account Number"
            value={state.to}
            onChange={(e) => setState({ ...state, to: e.target.value })}
          />
        </div>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Transfer From:
          </label>
          <input
            type="number"
            
            name="from"
            className="input"
            placeholder="Account Number"
            value={state.from}
            onChange={(e) => setState({ ...state, from: e.target.value })}
          />
        </div>
        <div className="form__item">
          <label htmlFor="from" className="label">
            Enter Amount:
          </label>
          <input
            type="number"
            min={1}
            name="from"
            className="input"
            placeholder="Amount"
            value={state.amount}
            onChange={(e) => setState({ ...state, amount: e.target.value })}
          />
        </div>
        <div className="form__item">
          <button type="submit" className="submit">
            Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

const CSS = css`
  width: 100%;
  height: calc(100vh - 1.5rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: cream;
  background: linear-gradient(
    180deg,
    cream 0%,
    cream 50%,
    cream 100%
  );

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

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: var(--dark-cornflower-blue);
    padding: 50px;
    margin: 0 auto;
    border-radius: 4px;
    color: white;
    font-family: "Roboto", sans-serif;
    width: 80%;
    max-width: 650px;

    .form__item {
      display: flex;
      flex-direction: column;
      padding: 5px;
      margin: 10px 0;

      .label {
        font-size: 20px;
      }

      .input {
        font-size: 18px;
        margin-top: 10px;
        padding: 5px;
        border-radius: 4px;
      }

      .submit {
        padding: 10px;
        text-transform: uppercase;
        border-radius: 4px;
        font-weight: 600;
        background: black;
        color: white;
        transition: all 0.3s ease;
      }

      .submit:hover {
        background-color: green;
        color: var(--navy-blue);
      }

      .submit:target {
        background-color: var(--blizzard-blue;);
      }
    }
  }

  @media screen and (max-width: 780px) {
    .form {
      width: 100%;
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export default Transfer;
