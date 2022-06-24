import React, { useEffect, useState, createContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

export const FirestoreDBContext = createContext({});

export const FirestoreDBContextProvider = ({ children }) => {
  // States
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    subscribe();
  }, []);

  // Subscribe to events
  const subscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        console.log("New post: ", change.doc.data());
      }
      if (change.type === "modified") {
        let alreadyPresent = false;
        posts.forEach((post) => {
          if (post.id === change.doc.id) {
            alreadyPresent = true;
          }
        });

        if (!alreadyPresent) {
          setPosts([{ id: change.doc.id, ...change.doc.data() }, ...posts]);
        }
        console.log("Modified post: ", change.doc.data());
      }
      if (change.type === "removed") {
        console.log("Removed post: ", change.doc.data());
      }
    });
  });

  return (
    <FirestoreDBContext.Provider value={{ posts, setPosts }}>
      {children}
    </FirestoreDBContext.Provider>
  );
};
