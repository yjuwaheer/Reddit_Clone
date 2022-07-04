import React, { useContext, useState } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
// Context
import { SettingsContext } from "../context/Settings";
// Chakra UI
import {
  Divider,
  useDisclosure,
  useToast,
  SlideFade,
  Box,
  Button,
} from "@chakra-ui/react";
// Icons
import { VscCommentDiscussion } from "react-icons/vsc";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { FaVoteYea } from "react-icons/fa";
// Components
import EditPostModal from "./EditPostModal";

const ProfilePostCard = ({ post }) => {
  // States
  const [toggleSlide, setToggleSlide] = useState(false);

  // Other hooks
  const { accentColor } = useContext(SettingsContext);
  const editPostModal = useDisclosure();
  const toast = useToast();

  const constructedDate = `${post.postedAt
    .toDate()
    .toDateString()} @ ${post.postedAt.toDate().toLocaleTimeString()}`;

  // Confirm / Deny deletion
  const confirmDeletion = () => {
    setToggleSlide(!toggleSlide);
  };

  // Delete post
  const deletePost = async (postId) => {
    await deleteDoc(doc(db, "posts", postId));
  };

  return (
    <>
      <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5 hover:drop-shadow-md mx-10">
        <div className="flex flex-col items-center w-20">
          <FaVoteYea />
          <div className="my-2 font-bold">{post.votes}</div>
        </div>
        <div className="w-full">
          <div className="flex justify-between items-center">
            <div className="font-black text-3xl text-left">{post.title}</div>
            <div className="flex items-center">
              <MdEdit
                fontSize={20}
                className="mr-3 hover:cursor-pointer hover:text-gray-500"
                onClick={editPostModal.onOpen}
              />
              <MdDeleteForever
                fontSize={20}
                className="hover:cursor-pointer hover:text-red-500"
                onClick={() => {
                  confirmDeletion();
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

        {/* Modals */}
        <EditPostModal
          isOpen={editPostModal.isOpen}
          onOpen={editPostModal.onOpen}
          onClose={editPostModal.onClose}
          post={post}
        />
      </div>

      {/* Delete post Slide confirmation */}
      {toggleSlide && (
        <SlideFade in className="fixed bottom-0 z-50 w-full">
          <Box
            bg={`${accentColor}.200`}
            shadow="md"
            className="rounded-t-3xl p-4"
          >
            <div className="text-lg font-semibold">
              Are you sure you want to delete the post?
            </div>
            <div>This cannot be undone.</div>
            <div className="pt-2">
              <Button
                size="sm"
                colorScheme="red"
                className="mr-3 hover:cursor-pointer"
                onClick={() => {
                  deletePost(post.id);
                }}
              >
                Confirm
              </Button>
              <Button
                size="sm"
                colorScheme="blackAlpha"
                className="hover:cursor-pointer"
                onClick={() => {
                  confirmDeletion();
                }}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </SlideFade>
      )}
    </>
  );
};

export default ProfilePostCard;
