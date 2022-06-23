import React from "react";
// Chakra UI
import { Divider, Avatar } from "@chakra-ui/react";
// Icons
import { BsArrowUpSquare, BsArrowDownSquare } from "react-icons/bs";
import { VscCommentDiscussion } from "react-icons/vsc";

const PostCard = () => {
  return (
    <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5">
      <div className="flex flex-col items-center mr-14">
        <BsArrowUpSquare className="hover:text-green-500 hover:cursor-pointer" />
        <div className="my-2 font-bold">50</div>
        <BsArrowDownSquare className="hover:text-red-500 hover:cursor-pointer" />
      </div>
      <div className="w-full">
        <div className="font-black text-3xl text-left">This is the title</div>
        <Divider className="my-4" />
        <div className="text-lg text-left">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum eos
          delectus, optio asperiores nobis repellendus vero. Iusto perferendis
          animi in facere doloribus rem iure error quos illo, accusamus sit,
          quaerat ea nulla? Iure magnam nihil fuga. Officia maiores consectetur
          aliquam repudiandae consequuntur laboriosam facilis aperiam labore
          porro, eligendi fugit aspernatur.
        </div>
        <Divider className="my-4" />

        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Avatar name="James Doe" src="" className="mr-3" />
            <div className="name">
              Posted by <span className="font-bold">James Doe</span>
            </div>
          </div>

          <div className="font-semibold">22/06/2022</div>
          <div className="flex items-center">
            5+
            <VscCommentDiscussion className="ml-2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
