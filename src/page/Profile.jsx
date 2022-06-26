import React, { useEffect, useState, useContext } from "react";
// Firebase
import { db, storage } from "../shared/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
import { SettingsContext } from "../context/Settings";
// Chakra UI
import {
  Image,
  Heading,
  Skeleton,
  SkeletonText,
  Button,
} from "@chakra-ui/react";

const Profile = () => {
  // States
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [userData, setUserData] = useState({});

  // Other hooks
  const { user } = useContext(AuthContext);
  const { accentColor } = useContext(SettingsContext);

  useEffect(() => {
    const getUserData = async () => {
      setLoadingUserData(true);
      const docSnap = await getDoc(doc(db, "users", user.uid));
      console.log(docSnap.data());
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
          {userData.backdropImageLink ? (
            <Image
              src="https://unsplash.com/photos/DlkF4-dbCOU/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU2MDk2ODQy&force=true&w=2400"
              alt="Backdrop"
              fit="cover"
              className="w-full h-72 rounded-xl"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-72 rounded-xl bg-slate-200">
              <Button colorScheme={accentColor}>+ Add Banner</Button>
            </div>
          )}

          {userData.profileImageLink ? (
            <Image
              src="https://unsplash.com/photos/RwHv7LgeC7s/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU2MDk3MTEw&force=true&w=2400"
              boxSize="150px"
              alt="profile"
              fit="cover"
              className="rounded-2xl absolute -bottom-8 left-12 shadow-xl"
            />
          ) : (
            <div
              className="flex justify-center items-center rounded-2xl absolute -bottom-8 left-12 shadow-xl bg-slate-100"
              style={{ width: 150, height: 150 }}
            >
              <Button colorScheme={accentColor}>+</Button>
            </div>
          )}
        </div>
      )}

      {!loadingUserData && (
        <div className="flex flex-col items-center">
          <Heading fontSize="xxx-large" className="mt-8 text-gray-700">
            {userData.username}
          </Heading>
          <p className="max-w-lg text-left">{userData.profileBio}</p>
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
