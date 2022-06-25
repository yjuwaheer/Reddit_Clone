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
// Icons
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";

const PostCard = ({ post }) => {
  // States
  const [author, setAuthor] = useState("");
  const [loadingAuthor, setLoadingAuthor] = useState(true);

  useEffect(() => {
    const getPostAuthor = async () => {
      setLoadingAuthor(true);
      const docSnap = await getDoc(doc(db, "users", post.authorId));
      setAuthor(docSnap.data());
      setTimeout(() => {
        setLoadingAuthor(false);
      }, 250);
    };

    getPostAuthor();
  }, []);

  const constructedDate = `${post.postedAt
    .toDate()
    .toDateString()} @ ${post.postedAt.toDate().toLocaleTimeString()}`;

  return (
    <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5 hover:drop-shadow-md">
      <div className="flex flex-col items-center mr-14">
        <BsArrowUpSquare className="hover:text-green-500 hover:cursor-pointer" />
        <div className="my-2 font-bold">{post.votes}</div>
        <BsArrowDownSquare className="hover:text-red-500 hover:cursor-pointer" />
      </div>
      <div className="w-full">
        <div className="font-black text-3xl text-left">{post.title}</div>
        <Divider className="my-4" />
        <div className="text-lg text-left">{post.description}</div>
        <Divider className="my-4" />

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {loadingAuthor ? (
              <SkeletonCircle size="12" className="mr-3" />
            ) : (
              <Avatar name={author.username} src="" className="mr-3" />
            )}
            <div className="flex items-center">
              Posted by
              {loadingAuthor ? (
                <SkeletonText noOfLines={1} width={20} className="ml-2" />
              ) : (
                <span className="font-bold ml-1">{author.username}</span>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <div className="font-semibold text-gray-400 mr-10">
              {constructedDate}
            </div>
            {post.commentsCount}
            <VscCommentDiscussion className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
