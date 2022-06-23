import React from "react";
// Chakra UI
import {
  Divider,
  Avatar,
} from "@chakra-ui/react";
// Icons
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";

const PostCard = () => {
  return (
    <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5">
      <div className="flex flex-col items-start mr-14">
        <BsArrowUp />
        <div className="stats">50</div>
        <BsArrowDown />
      </div>
      <div className="w-full">
        <div className="font-black text-3xl text-left">This is the title</div>
        <Divider className="my-4" />
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar name="James Doe" src="" className="mr-3" />
            <div className="name">Posted by James Doe</div>
          </div>

          <div className="time">22/06/2022</div>
          <div className="flex items-center">
            <VscCommentDiscussion />
            5+
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
