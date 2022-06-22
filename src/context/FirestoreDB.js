import React, { useEffect, useState, createContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, onSnapshot, query, collection } from "firebase/firestore";

export const FirestoreDBContext = createContext({});

export const FirestoreDBContextProvider = ({ children }) => {
  // States
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "post"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New post: ", change.doc.data());
          posts.push(change.doc.data());
        }
        if (change.type === "modified") {
          console.log("Modified post: ", change.doc.data());
        }
        if (change.type === "removed") {
          console.log("Removed post: ", change.doc.data());
        }
      });
    });
  }, []);

  return (
    <FirestoreDBContext.Provider value={{ posts, setPosts }}>
      {children}
    </FirestoreDBContext.Provider>
  );
};
