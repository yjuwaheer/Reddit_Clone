import React, { useEffect, useState, useContext } from "react";
// Router
import { useParams } from "react-router-dom";
// Firebase
import { db } from "../shared/FirebaseConfig";
import {
  doc,
  getDoc,
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
import { SettingsContext } from "../context/Settings";
// Chakra UI
import { Button, Skeleton, Textarea, useToast } from "@chakra-ui/react";
// Icons
import { BiCommentDetail } from "react-icons/bi";
import { VscSmiley } from "react-icons/vsc";
// Components
import Comment from "./Comment";

const CommentSection = ({ author }) => {
  // States
  const [comment, setComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [userComments, setUserComments] = useState([]);

  // Other hooks
  const { user } = useContext(AuthContext);
  const { postId } = useParams();
  const { accentColor } = useContext(SettingsContext);
  const toast = useToast();

  useEffect(() => {
    getComments(postId);
  }, []);

  // Fetch the user comments related to the post if any
  const getComments = async (postId) => {
    let tempComments = [];

    try {
      const querySnapshot = await getDocs(collection(db, postId));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempComments.push({ id: doc.id, ...doc.data() });
      });

      if (tempComments.length > 0) {
        setUserComments(tempComments);
        setLoadingComments(false);
      } else {
        setLoadingComments(false);
      }
    } catch (error) {
      setLoadingComments(false);
      console.log(error);
    }
  };

  // Save new comment
  const saveComment = async () => {
    if (comment.length <= 10) {
      toast({
        title: "Info",
        description: "Comment must be at least 10 characters.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    console.log(user.uid);

    try {
      const docRef = await addDoc(collection(db, postId), {
        text: comment,
        commentAuthorId: user.uid,
        createdAt: serverTimestamp(),
      });
      incrementCommentCount();
    } catch (error) {
      console.log(error);
    }
  };

  // Update comment count
  const incrementCommentCount = async () => {
    try {
      const docSnap = await getDoc(doc(db, "posts", postId));
      const newCount = docSnap.data().commentsCount + 1;
      const updated = await updateDoc(doc(db, "posts", postId), {
        commentsCount: newCount,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex flex-col mt-10 w-8/12">
        <div className="text-left font-bold mb-1">Add a comment</div>
        <Textarea
          variant="filled"
          focusBorderColor={`${accentColor}.500`}
          rows="8"
          className="p-2 w-full rounded-lg resize-none"
          placeholder="Type your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></Textarea>
        <Button
          className="self-end mt-2"
          colorScheme={accentColor}
          onClick={() => {
            saveComment();
          }}
        >
          <BiCommentDetail className="mr-2" />
          Add Comment
        </Button>
      </div>

      <div className="mt-12 w-8/12">
        {loadingComments && (
          <>
            <Skeleton height="150px" className="mb-5" />
            <Skeleton height="150px" className="mb-5" />
            <Skeleton height="150px" className="mb-5" />
          </>
        )}

        {!loadingComments &&
          userComments.length > 0 &&
          userComments.map((commentObj) => (
            <Comment key={commentObj.id} commentObj={commentObj} />
          ))}

        {!loadingComments && userComments.length === 0 && (
          <>
            <div className="font-bold text-xl">No comments yet...</div>
            <div className="flex items-center justify-center font-medium text-lg">
              Be the first one to comment <VscSmiley className="ml-1" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CommentSection;
