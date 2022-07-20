import React, { useEffect, useState, useContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// Context
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
} from "@chakra-ui/react";
// Icons
import { BiCommentDetail } from "react-icons/bi";

const CommentSection = () => {
  // States
  const [author, setAuthor] = useState({});
  const [loadingAuthor, setLoadingAuthor] = useState(true);

  // Other hooks
  const { accentColor } = useContext(SettingsContext);

  useEffect(() => {
    getPostAuthor("KD3I1q6HZfYXcZe8ao0qpUZkiHW2");
  }, []);

  // Get the author of the post
  const getPostAuthor = async (authorId) => {
    setLoadingAuthor(true);
    const docSnap = await getDoc(doc(db, "users", authorId));
    setAuthor(docSnap.data());
    setTimeout(() => {
      setLoadingAuthor(false);
    }, 250);
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
        ></Textarea>
        <Button className="self-end mt-2" colorScheme={accentColor}>
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
