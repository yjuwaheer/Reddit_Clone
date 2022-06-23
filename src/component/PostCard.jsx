import React from "react";
// Chakra UI
import { Divider, Avatar } from "@chakra-ui/react";
// Icons
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";

const PostCard = ({ post }) => {
  const constructedDate = `${post.postedAt
    .toDate()
    .toDateString()} ~ ${post.postedAt.toDate().toLocaleTimeString()}`;

  return (
    <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5">
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
            <Avatar name="James Doe" src="" className="mr-3" />
            <div className="name">
              Posted by <span className="font-bold">{post.postedBy}</span>
            </div>
          </div>

          <div className="font-semibold text-gray-400">{constructedDate}</div>
          <div className="flex items-center">
            {post.commentsCount}
            <VscCommentDiscussion className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
