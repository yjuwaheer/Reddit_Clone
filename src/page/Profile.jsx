import React, { useEffect, useState, useContext } from "react";
// Firestore
import { db } from "../shared/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
// Chakra UI
import { Image, Heading, Skeleton, SkeletonText } from "@chakra-ui/react";

const Profile = () => {
  // States
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [userData, setUserData] = useState({});

  // Other hooks
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const getUserData = async () => {
      setLoadingUserData(true);
      const docSnap = await getDoc(doc(db, "users", user.uid));
      setUserData(docSnap.data());
      setTimeout(() => {
        setLoadingUserData(false);
      }, 250);
    };

    if (Object.keys(user).length === 0) {
      return;
    } else {
      getUserData();
    }
  }, []);

  return (
    <div className="flex flex-col mt-10 mx-10">
      {!loadingUserData && (
        <div className="relative">
          <Image
            src="https://unsplash.com/photos/DlkF4-dbCOU/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU2MDk2ODQy&force=true&w=2400"
            alt="Backdrop"
            fit="cover"
            className="w-full h-72 rounded-xl"
          />

          <Image
            src="https://unsplash.com/photos/RwHv7LgeC7s/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU2MDk3MTEw&force=true&w=2400"
            boxSize="150px"
            alt="profile"
            fit="cover"
            className="rounded-2xl absolute -bottom-8 left-12 shadow-xl"
          />
        </div>
      )}

      {loadingUserData && (
        <div className="relative">
          <Skeleton className="w-full h-72" />
          <Skeleton
            width={150}
            height={150}
            className="absolute -bottom-8 left-12"
          />
        </div>
      )}

      {!loadingUserData && (
        <div className="flex flex-col items-center">
          <Heading fontSize="xxx-large" className="mt-8 text-gray-700">
            First Last
          </Heading>
          <p className="max-w-lg text-left">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Accusantium ducimus itaque asperiores aperiam iusto officia sit
            pariatur dolor vitae iste.
          </p>
        </div>
      )}

      {loadingUserData && (
        <div className="flex flex-col items-center">
          <Skeleton height="30px" width="150px" className="mt-8 mb-2" />
          <SkeletonText
            mt="4"
            noOfLines={4}
            spacing="4"
            width="500px"
            className="max-w-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Profile;
