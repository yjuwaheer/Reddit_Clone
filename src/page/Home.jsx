import React, { useEffect, useState, useContext } from "react";
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
  Input,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
// Lottie
import { Player } from "@lottiefiles/react-lottie-player";
// Icons
import { BsSearch } from "react-icons/bs";
import { HiRefresh } from "react-icons/hi";
// Components
import PostCard from "../component/PostCard";

const Home = () => {
  // States
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);

  // Other hooks
  const { posts, setPosts, alertNewPost, setAlertNewPost, setPostsTracker } =
    useContext(FirestoreDBContext);
  const { accentColor } = useContext(SettingsContext);

  useEffect(() => {
    // Inital posts fetch
    const initialPostsFetch = async () => {
      setLoading(true);
      let tempPosts = [];
      let tempTracker = [];
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("postedAt", "desc"))
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempPosts.push({ id: doc.id, ...doc.data() });
        tempTracker.push(doc.id);
      });
      setPosts(tempPosts);
      setPostsTracker(tempTracker);
      setLoading(false);
      setAlertNewPost(false);
    };

    initialPostsFetch();
  }, [trigger]);

  return (
    <div className="flex flex-col">
      <div className="self-center w-80 mt-10">
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            placeholder="Search"
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
          />
        </InputGroup>
      </div>

      <div className="flex m-10">
        <div className="w-4/5">
          {loading && (
            <>
              <Skeleton height="150px" className="mb-5" />
              <Skeleton height="150px" className="mb-5" />
              <Skeleton height="150px" className="mb-5" />
            </>
          )}

          {!loading &&
            posts.length > 0 &&
            posts.map((post) => <PostCard post={post} key={post.id} />)}

          {!loading && posts.length === 0 && (
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

          <div className="text-xl my-1 font-mono text-gray-600 hover:underline hover:underline-offset-1 hover:cursor-pointer">
            Cars
          </div>
          <div className="text-xl my-1 font-mono text-gray-600 hover:underline hover:underline-offset-1 hover:cursor-pointer">
            Computers
          </div>
          <div className="text-xl my-1 font-mono text-gray-600 hover:underline hover:underline-offset-1 hover:cursor-pointer">
            JS
          </div>
          <div className="text-xl my-1 font-mono text-gray-600 hover:underline hover:underline-offset-1 hover:cursor-pointer">
            Space
          </div>
        </div>
      </div>

      {alertNewPost && (
        <div
          className="flex items-center fixed bottom-5 left-1/2 bg-gray-200 px-3 rounded-lg font-bold text-gray-600 hover:cursor-pointer hover:bg-gray-300 border-2 border-gray-300"
          onClick={() => {
            setTrigger(!trigger);
          }}
        >
          <HiRefresh className="mr-2" />
          Load new posts
        </div>
      )}
    </div>
  );
};

export default Home;
