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
  Stack,
  Skeleton,
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
            colorScheme="orange"
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

        <div className="mx-5">RIGHT</div>
      </div>
    </div>
  );
};

export default Home;
