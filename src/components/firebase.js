// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6yYI94R4TQuqQsY3TJedMdJvYPsKVxIc",
  authDomain: "bank-c6bb7.firebaseapp.com",
  projectId: "bank-c6bb7",
  storageBucket: "bank-c6bb7.appspot.com",
  messagingSenderId: "692233047406",
  appId: "1:692233047406:web:f3ef609910ca82a129857f",
  measurementId: "G-X05T0E0825"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export const addUser = ([Name, AccountNo, Balance]) => {
  return db
    .collection("users")
    .add({ Name: Name, AccountNo: AccountNo, Balance: Balance });
};

export const addTransaction = (amount, to, from) => {
  return db
    .collection("transactions")
    .add({ amount: amount, to: to, from: from, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
};

export const transact = async (id1, balance1, id2, balance2, amount) => {
  try {
    await db.collection("users").doc(id1).update({
      Balance: Number(balance1) - Number(amount)
    });

    await db.collection("users").doc(id2).update({
      Balance: Number(balance2) + Number(amount)
    });

    console.log("Transaction successful");
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error; // Propagate the error for further handling
  }
};


export { db };
