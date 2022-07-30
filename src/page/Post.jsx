import React, { useEffect, useState, useContext } from "react";
// Router
import { useNavigate, useParams } from "react-router-dom";
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
  Badge,
} from "@chakra-ui/react";
// Icons
import { VscCommentDiscussion } from "react-icons/vsc";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaVoteYea } from "react-icons/fa";
import { AiFillTag } from "react-icons/ai";
// Components
import CommentSection from "../component/CommentSection";

const Post = () => {
  // States
  const [post, setPost] = useState({});
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingAuthor, setLoadingAuthor] = useState(true);
  const [triggerReload, setTriggerReload] = useState(false);

  // Other hooks
  const navigate = useNavigate();
  const { postId } = useParams();
  const { accentColor } = useContext(SettingsContext);

  useEffect(() => {
    getPost();
  }, [triggerReload]);

  // Get post data from firebase
  const getPost = async () => {
    try {
      const docRef = doc(db, "posts", postId);
      const docSnap = await getDoc(docRef);
      setPost(docSnap.data());
      setTimeout(() => {
        setLoading(false);
      }, 250);
      getPostAuthor(docSnap.data().authorId);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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
    <div className="flex flex-col items-center mb-10">
      {loading && <Skeleton height="225px" className="w-9/12 mt-10" />}

      {!loading && (
        <div className="flex drop-shadow-sm border-2 w-9/12 p-4 mt-10 rounded-md bg-slate-50 mb-5 relative">
          <div className="fixed -top-5 -left-7 shadow-md rounded-lg border-2 border-zinc-400">
            <Button
              colorScheme="gray"
              variant="solid"
              onClick={() => {
                navigate("/");
              }}
            >
              <IoMdArrowRoundBack />
            </Button>
          </div>

          <div className="flex flex-col items-center w-20">
            <FaVoteYea />
            <div className="my-2 font-bold">{post.votes}</div>
          </div>
          <div className="w-full">
            <div className="font-black text-3xl text-left">{post.title}</div>
            <Divider className="my-4" />
            <div className="text-lg text-left">{post.description}</div>

            {/* Tags */}
            <div className="flex mt-3">
              <Badge variant="solid" className="mr-2">
                <div className="flex items-center">
                  <AiFillTag className="mr-1" />
                  Tags
                </div>
              </Badge>
              {post.tags.length > 0 &&
                post.tags.map((tag) => (
                  <Badge
                    variant="solid"
                    colorScheme={accentColor}
                    className="px-1 mr-2"
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              {post.tags.length === 0 && <Badge>None</Badge>}
            </div>

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
                  {`${post.postedAt.toDate().toDateString()} @ ${post.postedAt
                    .toDate()
                    .toLocaleTimeString()}`}
                </div>
                {post.commentsCount}
                <VscCommentDiscussion className="ml-2" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Comments section of the post */}
      <CommentSection
        author={author}
        triggerReload={triggerReload}
        setTriggerReload={setTriggerReload}
      />
    </div>
  );
};

export default Post;
