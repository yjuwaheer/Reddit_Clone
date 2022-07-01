import React, { useEffect, useState, createContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { onSnapshot, collection } from "firebase/firestore";

export const FirestoreDBContext = createContext({});

export const FirestoreDBContextProvider = ({ children }) => {
  // States
  const [posts, setPosts] = useState([]);
  const [postsTracker, setPostsTracker] = useState([]);
  const [profilePosts, setProfilePosts] = useState([]);
  const [alertNewPost, setAlertNewPost] = useState(false);
  const [addedAuthorId, setAddedAuthorId] = useState("");

  useEffect(() => {
    subscribe();
  }, []);

  // Subscribe to events
  const subscribe = onSnapshot(collection(db, "posts"), (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === "added") {
        // console.log("New post: ", change.doc.data());

        if (postsTracker.includes(change.doc.id)) {
          // console.log("Post present");
        } else {
          // console.log("Post absent");
          setAddedAuthorId(change.doc.data().authorId)
          setAlertNewPost(true);
        }
      }
      if (change.type === "modified") {
        // console.log("Modified post: ", change.doc.data());

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
        alertNewPost,
        setAlertNewPost,
        postsTracker,
        setPostsTracker,
        addedAuthorId,
        setAddedAuthorId,
      }}
    >
      {children}
    </FirestoreDBContext.Provider>
  );
};
