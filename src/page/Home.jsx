import React, { useEffect, useState, useContext } from "react";
// Firestore
import { db } from "../shared/FirebaseConfig";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
// Context
import { FirestoreDBContext } from "../context/FirestoreDB";
// Chakra UI
import {
  InputGroup,
  InputLeftElement,
  Input,
  Skeleton,
  Divider,
} from "@chakra-ui/react";
// Lottie
import { Player, Controls } from "@lottiefiles/react-lottie-player";
// Icons
import { BsSearch } from "react-icons/bs";
// Components
import PostCard from "../component/PostCard";

const Home = () => {
  // States
  const [loading, setLoading] = useState(true);

  // Other hooks
  const { posts, setPosts } = useContext(FirestoreDBContext);

  useEffect(() => {
    // Inital posts fetch
    const initialPostsFetch = async () => {
      setLoading(true);
      let tempPosts = [];
      const querySnapshot = await getDocs(
        query(collection(db, "posts"), orderBy("postedAt", "desc"))
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        tempPosts.push({ id: doc.id, ...doc.data() });
      });
      setPosts(tempPosts);
      setLoading(false);
    };

    initialPostsFetch();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="self-center w-80 mt-10">
        <InputGroup>
          <InputLeftElement pointerEvents="none" children={<BsSearch />} />
          <Input
            placeholder="Search"
            variant="filled"
            focusBorderColor="orange.500"
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
    </div>
  );
};

export default Home;
