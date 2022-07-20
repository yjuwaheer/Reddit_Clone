import React, { useEffect, useState, useContext } from "react";
// Router
import { useParams } from "react-router-dom";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, getDoc, addDoc, collection, getDocs } from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
import { SettingsContext } from "../context/Settings";
// Chakra UI
import {
  Button,
  Divider,
  Avatar,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Textarea,
  useToast,
} from "@chakra-ui/react";
// Icons
import { BiCommentDetail } from "react-icons/bi";

const CommentSection = ({ author }) => {
  // States
  const [comment, setComment] = useState("");
  const [userComments, setUserComments] = useState([]);
  const [loadingAuthor, setLoadingAuthor] = useState(false);

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

    const querySnapshot = await getDocs(collection(db, postId));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      tempComments.push({id: doc.id, ...doc.data()})
    });
    if (tempComments.length > 0) {
      console.log(tempComments)
      console.log("Comments present");
    } else {
      console.log("No comments");
    }
  };

  // Get the author of the comment

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
      const docRef = addDoc(collection(db, postId), {
        comment: comment,
        commentAuthorId: user.uid,
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
        <div className="flex flex-col items-start bg-slate-50 p-3 rounded-md border-2 border-slate-200">
          <div className="flex items-center">
            {loadingAuthor ? (
              <SkeletonCircle size="12" className="mr-3" />
            ) : (
              <Avatar
                name={author.username}
                src={author.profileImageLink ? author.profileImageLink : ""}
                className="mr-3"
              />
            )}
            <div className="flex items-center">
              {loadingAuthor ? (
                <SkeletonText noOfLines={1} width={20} className="mr-2" />
              ) : (
                <span className="font-extrabold mr-1 text-xl">
                  {author.username}
                </span>
              )}{" "}
              <span className="text-xl">commented</span>
            </div>
          </div>
          <Divider className="my-4" />
          <div className="text-lg text-gray-600">This is the comment</div>
        </div>
      </div>
    </>
  );
};

export default CommentSection;
