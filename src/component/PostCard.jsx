import React, { useEffect, useState } from "react";
// Router
import { useNavigate } from "react-router-dom";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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

  // Other hooks
  const navigate = useNavigate();

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

  // Upvote post
  const upvotePost = async () => {
    const newVotes = post.votes + 1;

    try {
      const updated = await updateDoc(doc(db, "posts", post.id), {
        votes: newVotes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Downvote post
  const downvotePost = async () => {
    const newVotes = post.votes - 1;

    try {
      const updated = await updateDoc(doc(db, "posts", post.id), {
        votes: newVotes,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex drop-shadow-sm border-2 p-4 rounded-md bg-slate-50 mb-5 hover:drop-shadow-md">
      <div className="flex flex-col items-center w-20">
        <BsArrowUpSquare
          className="hover:text-green-500 hover:cursor-pointer"
          onClick={() => {
            upvotePost();
          }}
        />
        <div className="my-2 font-bold">{post.votes}</div>
        <BsArrowDownSquare
          className="hover:text-red-500 hover:cursor-pointer"
          onClick={() => {
            downvotePost();
          }}
        />
      </div>
      <div className="w-full">
        <div
          className="font-black text-3xl text-left text-gray-700 hover:cursor-pointer hover:text-gray-900"
          onClick={() => {
            navigate(`/post/${post.id}`);
          }}
        >
          {post.title}
        </div>
        <Divider className="my-4" />
        <div className="text-lg text-left">{post.description}</div>
        <Divider className="my-4" />

        <div className="flex justify-between items-center">
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
