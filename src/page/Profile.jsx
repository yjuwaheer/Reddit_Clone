import React, { useEffect, useState, useContext, useRef } from "react";
// Firebase
import { db, storage } from "../shared/FirebaseConfig";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
  Input,
} from "@chakra-ui/react";
// Icons
import { BsUpload } from "react-icons/bs";

const Profile = () => {
  // States
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [userData, setUserData] = useState({});
  const [bannerImage, setBannerImage] = useState();
  const [profileImage, setProfileImage] = useState();
  const [triggerReload, setTriggerReload] = useState(false);

  // Other hooks
  const { user } = useContext(AuthContext);
  const { accentColor } = useContext(SettingsContext);
  const profileRef = useRef();
  const bannerRef = useRef();

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
  }, [triggerReload, user]);

  // Update banner image
  const updateBannerImage = async (e) => {
    setBannerImage(e.target.files[0]);

    // Upload banner image to bucket
    const bannerImageRef = ref(storage, `bannerImages/${user.uid}`);
    const uploadTask = await uploadBytes(bannerImageRef, e.target.files[0]);
    const bannerImageUrl = await getDownloadURL(uploadTask.ref);

    // Update user document in firestore
    const updated = await updateDoc(doc(db, "users", user.uid), {
      bannerImageLink: bannerImageUrl,
      lastUpdatedAt: serverTimestamp(),
    });
    setTriggerReload(!triggerReload);
  };

  // Update profile image
  const updateProfileImage = async (e) => {
    setProfileImage(e.target.files[0]);

    // Upload profile image to bucket
    const profileImageRef = ref(storage, `profileImages/${user.uid}`);
    const uploadTask = await uploadBytes(profileImageRef, e.target.files[0]);
    const profileImageUrl = await getDownloadURL(uploadTask.ref);

    // Update user document in firestore
    const updated = await updateDoc(doc(db, "users", user.uid), {
      profileImageLink: profileImageUrl,
      lastUpdatedAt: serverTimestamp(),
    });
    setTriggerReload(!triggerReload);
  };

  return (
    <div className="flex flex-col mt-10 mx-10">
      {!loadingUserData && (
        <div className="relative">
          {userData.bannerImageLink ? (
            <div>
              <Image
                src={userData.bannerImageLink}
                alt="banner"
                fit="cover"
                className="w-full h-72 rounded-xl"
              />
              <BsUpload
                className="absolute right-2 bottom-2 font-extrabold bg-slate-50 p-0.5 text-3xl opacity-70 rounded-md hover:bg-gray-200 hover:cursor-pointer hover:opacity-100"
                onClick={() => {
                  bannerRef.current.click();
                }}
              />
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-72 rounded-xl bg-slate-200">
              <Button
                colorScheme={accentColor}
                onClick={() => {
                  bannerRef.current.click();
                }}
              >
                + Add Banner
              </Button>
            </div>
          )}

          {userData.profileImageLink ? (
            <div>
              <Image
                src={userData.profileImageLink}
                boxSize="150px"
                alt="profile"
                fit="cover"
                className="rounded-2xl absolute -bottom-8 left-12 shadow-xl"
              />
              <BsUpload
                className="absolute -bottom-6 left-14 font-extrabold bg-slate-50 p-0.5 text-3xl opacity-70 rounded-md hover:bg-gray-200 hover:cursor-pointer hover:opacity-100"
                onClick={() => {
                  profileRef.current.click();
                }}
              />
            </div>
          ) : (
            <div
              className="flex justify-center items-center rounded-2xl absolute -bottom-8 left-12 shadow-xl bg-slate-100"
              style={{ width: 150, height: 150 }}
            >
              <Button
                colorScheme={accentColor}
                onClick={() => {
                  profileRef.current.click();
                }}
              >
                +
              </Button>
            </div>
          )}
        </div>
      )}

      {!loadingUserData && (
        <div className="flex flex-col items-center">
          <Heading fontSize="xxx-large" className="mt-8 text-gray-700">
            {userData.username}
          </Heading>
          {userData.profileBio ? (
            <p className="max-w-lg text-left">{userData.profileBio}</p>
          ) : (
            <p className="max-w-lg text-left text-gray-400">
              Update your bio in settings
            </p>
          )}
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

      {/* Input ref (Not displayed) */}
      <Input
        type="file"
        ref={bannerRef}
        display="none"
        accept="image/*"
        onChange={(e) => {
          updateBannerImage(e);
        }}
      />
      <Input
        type="file"
        ref={profileRef}
        display="none"
        accept="image/*"
        onChange={(e) => {
          updateProfileImage(e);
        }}
      />
    </div>
  );
};

export default Profile;
