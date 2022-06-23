import React, { useEffect, useState, useContext } from "react";
// Firestore
import { db } from "../shared/FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
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
      const querySnapshot = await getDocs(collection(db, "posts"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
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

          {!loading && posts.length === 0 && <div>Empty</div>}
        </div>

        <div className="mx-5">RIGHT</div>
      </div>
    </div>
  );
};

export default Home;
