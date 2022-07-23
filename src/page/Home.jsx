import React, { useEffect, useState, useContext, useRef } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
// Context
import { FirestoreDBContext } from "../context/FirestoreDB";
import { SettingsContext } from "../context/Settings";
// Chakra UI
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  Button,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
// Lottie
import { Player } from "@lottiefiles/react-lottie-player";
// Icons
import { BsSearch, BsEmojiSmileUpsideDown } from "react-icons/bs";
import { MdClear } from "react-icons/md";
import { ImArrowUp } from "react-icons/im";
// Components
import PostCard from "../component/PostCard";
// Scroll to top
import ScrollToTop from "react-scroll-to-top";

const Home = () => {
  // States
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [searchPosts, setSearchPosts] = useState([]);
  const [randomTags, setRandomTags] = useState([]);

  // Other hooks
  const { posts, setPosts } = useContext(FirestoreDBContext);
  const { accentColor } = useContext(SettingsContext);
  const searchInput = useRef();

  useEffect(() => {
    // Inital posts fetch
    const initialPostsFetch = async () => {
      setLoading(true);
      let tempPosts = [];
      let tempTags = [];
      let tempTracker = [];
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("postedAt", "desc"))
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempPosts.push({ id: doc.id, ...doc.data() });
        tempTracker.push(doc.id);

        // Get random tags
        doc.data().tags.forEach((tag) => {
          if (!tempTags.includes(tag) && tempTags.length < 15) {
            if (Math.random() > 0.5) {
              tempTags.push(tag);
            }
          }
        });
      });
      setRandomTags(tempTags);
      setPosts(tempPosts);
      setLoading(false);
    };

    initialPostsFetch();
  }, []);

  // Search posts
  const searchPostsFetch = async (text) => {
    if (text.length === 0) {
      setSearching(false);
      setSearchPosts([]);
      return;
    }

    let tempPosts = [];

    const querySnapshot = await getDocs(query(collection(db, "posts")));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.data().title.toLowerCase().includes(text.toLowerCase())) {
        tempPosts.push({ id: doc.id, ...doc.data() });
      }
    });
    setSearchPosts(tempPosts);
    setSearching(true);
  };

  return (
    <div className="flex flex-col">
      <div className="self-center w-80 mt-10">
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            ref={searchInput}
            placeholder="Search"
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
            onChange={(e) => {
              searchPostsFetch(e.target.value);
            }}
          />
          {searching && (
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => {
                  searchInput.current.value = "";
                  searchPostsFetch("");
                }}
              >
                <MdClear />
              </Button>
            </InputRightElement>
          )}
        </InputGroup>
      </div>

      <div className="flex m-10">
        <div className="w-4/5">
          {loading && (
            <>
              <Skeleton height="175px" className="mb-5" />
              <Skeleton height="175px" className="mb-5" />
              <Skeleton height="175px" className="mb-5" />
            </>
          )}

          {!loading &&
            posts.length > 0 &&
            searchPosts.length === 0 &&
            !searching &&
            posts.map((post) => <PostCard post={post} key={post.id} />)}

          {!loading &&
            searchPosts.length > 0 &&
            searchPosts.map((post) => <PostCard post={post} key={post.id} />)}

          {!loading && searchPosts.length === 0 && searching && (
            <div className="flex flex-col justify-center">
              <div className="text-2xl font-bold">
                Sorry, we couldn't find any results...
              </div>
              <div className="flex items-center justify-center  text-xl font-medium">
                Try searching something else{" "}
                <BsEmojiSmileUpsideDown className="ml-1" />
              </div>
            </div>
          )}

          {!loading && posts.length === 0 && searchPosts === 0 && (
            <>
              <Player
                autoplay
                loop
                src="https://assets4.lottiefiles.com/packages/lf20_QJMen2.json"
                speed={0.5}
                style={{ height: "300px" }}
              ></Player>
              <div className="text-2xl font-bold">No post found :-(</div>
              <div className="text-xl font-medium">Try adding one</div>
            </>
          )}
        </div>

        <div className="flex flex-col drop-shadow-sm border-2 ml-5 p-4 rounded-md  w-1/5 h-96">
          <div className="text-2xl font-bold">Random Tags</div>

          <Divider className="my-2" />

          <div className="overflow-y-scroll">
            {randomTags.length > 0 &&
              randomTags.map((tag) => (
                <div
                  className="text-xl my-1 py-1 font-mono text-gray-600 hover:underline-offset-1 hover:cursor-pointer hover:bg-slate-100 hover:rounded-md hover:shadow-sm hover:text-gray-900"
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            {loading && (
              <>
                <Skeleton height="30px" className="my-2 py-1" />
                <Skeleton height="30px" className="my-2 py-1" />
                <Skeleton height="30px" className="my-2 py-1" />
              </>
            )}
          </div>
        </div>
      </div>

      <ScrollToTop
        smooth
        component={<ImArrowUp />}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "rgba(255, 217, 19, 0.4)",
          boxShadow:
            "rgb(255, 217, 19) 0px 0px 0px 3px, rgb(255, 156, 85) 0px 0px 0px 6px, rgb(255, 85, 85) 0px 0px 0px 9px",
        }}
      />
      {/* <div
        className="flex items-center fixed bottom-5 left-1/2 -translate-x-1/2 bg-gray-200 px-3 rounded-lg font-bold text-gray-600 hover:cursor-pointer hover:bg-gray-300 border-2 border-gray-300"
        onClick={() => {}}
      >
        <HiRefresh className="mr-2" />
        Load new posts
      </div> */}
    </div>
  );
};

export default Home;
