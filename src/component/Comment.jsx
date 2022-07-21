import React, { useEffect, useState } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// Chakra UI
import {
  Divider,
  Avatar,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";

const Comment = ({ commentObj }) => {
  // States
  const [commentAuthor, setCommentAuthor] = useState({});
  const [loadingAuthor, setLoadingAuthor] = useState(false);

  useEffect(() => {
    getCommentAuthor(commentObj.commentAuthorId);
  }, []);

  // Get the author of the comment
  const getCommentAuthor = async (authorId) => {
    setLoadingAuthor(true);
    const docSnap = await getDoc(doc(db, "users", authorId));
    setCommentAuthor(docSnap.data());
    setTimeout(() => {
      setLoadingAuthor(false);
    }, 250);
  };

  return (
    <div className="flex flex-col items-start mb-5 bg-slate-50 p-3 rounded-md border-2 border-slate-200">
      <div className="flex items-center">
        {loadingAuthor ? (
          <SkeletonCircle size="12" className="mr-3" />
        ) : (
          <Avatar
            name={commentAuthor.username}
            src={
              commentAuthor.profileImageLink
                ? commentAuthor.profileImageLink
                : ""
            }
            className="mr-3"
          />
        )}
        <div className="flex items-center">
          {loadingAuthor ? (
            <SkeletonText noOfLines={1} width={20} className="mr-2" />
          ) : (
            <span className="font-extrabold mr-1 text-xl">
              {commentAuthor.username}
            </span>
          )}{" "}
          <span className="text-xl">commented</span>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="text-lg text-gray-600">{commentObj.text}</div>
    </div>
  );
};

export default Comment;
