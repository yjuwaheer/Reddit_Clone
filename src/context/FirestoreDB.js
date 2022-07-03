import React, { useEffect, useState, createContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

export const FirestoreDBContext = createContext({});

export const FirestoreDBContextProvider = ({ children }) => {
  // States
  const [posts, setPosts] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);

  useEffect(() => {
    subscribe();
  }, []);

  // Subscribe to events
  const subscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // console.log("New post: ", change.doc.data());
      }
      if (change.type === "modified") {
        // console.log("Modified post: ", change.doc.data());

        // HOME POSTS
        let alreadyPresent = false;
        posts.forEach((post) => {
          if (post.id === change.doc.id) {
            alreadyPresent = true;
          }
        });

        // Add new post to array if not present
        if (!alreadyPresent) {
          setPosts([{ id: change.doc.id, ...change.doc.data() }, ...posts]);
        }

        // Update post if already present
        let tempPosts = [];
        if (alreadyPresent) {
          posts.forEach((post) => {
            if (post.id === change.doc.id) {
              tempPosts.push({ id: change.doc.id, ...change.doc.data() });
            } else {
              tempPosts.push(post);
            }
          });
          setPosts(tempPosts);
        }

        // PROFILE POSTS
        let alreadyPresentProfile = false;
        profilePosts.forEach((post) => {
          if (post.id === change.doc.id) {
            alreadyPresentProfile = true;
          }
        });

        // Update profile posts if already present
        let tempProfilePosts = [];
        if (alreadyPresentProfile) {
          profilePosts.forEach((post) => {
            if (post.id === change.doc.id) {
              tempProfilePosts.push({ id: change.doc.id, ...change.doc.data() });
            } else {
              tempProfilePosts.push(post);
            }
          });
          setProfilePosts(tempProfilePosts);
        }
      }
      if (change.type === "removed") {
        // console.log("Removed post: ", change.doc.data());

        let tempPosts = posts.filter((post) => post.id !== change.doc.id);
        setPosts(tempPosts);

        let tempProfilePosts = profilePosts.filter(
          (post) => post.id !== change.doc.id
        );
        setProfilePosts(tempProfilePosts);
      }
    });
  });

  return (
    <FirestoreDBContext.Provider
      value={{
        posts,
        setPosts,
        profilePosts,
        setProfilePosts,
      }}
    >
      {children}
    </FirestoreDBContext.Provider>
  );
};
