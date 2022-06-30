import React, { useContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
// Chakra UI
import { Divider } from "@chakra-ui/react";
// Icons
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";
import { MdDeleteForever, MdEdit } from "react-icons/md";

const ProfilePostCard = ({ post }) => {
  const constructedDate = `${post.postedAt
    .toDate()
    .toDateString()} @ ${post.postedAt.toDate().toLocaleTimeString()}`;

  // Delete post
  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  return (
    <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5 hover:drop-shadow-md">
      <div className="flex flex-col items-center w-20">
        <BsArrowUpSquare
          className="hover:text-green-500 hover:cursor-pointer"
          // onClick={() => {
          //   upvotePost();
          // }}
        />
        <div className="my-2 font-bold">{post.votes}</div>
        <BsArrowDownSquare
          className="hover:text-red-500 hover:cursor-pointer"
          // onClick={() => {
          //   downvotePost();
          // }}
        />
      </div>
      <div className="w-full">
        <div className="flex justify-between items-center">
          <div className="font-black text-3xl text-left">{post.title}</div>
          <div className="flex items-center">
            <MdEdit
              fontSize={20}
              className="mr-3 hover:cursor-pointer hover:text-gray-500"
            />
            <MdDeleteForever
              fontSize={20}
              className="hover:cursor-pointer hover:text-red-500"
              onClick={() => {
                deletePost(post.id);
              }}
            />
          </div>
        </div>
        <Divider className="my-4" />
        <div className="text-lg text-left">{post.description}</div>
        <Divider className="my-4" />

        <div className="flex justify-between items-center">
          <div className="font-semibold text-gray-400 mr-10">
            {constructedDate}
          </div>
          <div className="flex items-center">
            {post.commentsCount}
            <VscCommentDiscussion className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePostCard;
