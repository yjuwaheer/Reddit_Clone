import React from "react";
// Chakra UI
import { Image, Heading } from "@chakra-ui/react";

const Profile = () => {
  return (
    <div className="flex flex-col mt-10 mx-10">
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
          className="rounded-2xl absolute -bottom-12 left-12 shadow-xl"
        />
      </div>

      <div className="flex flex-col items-center">
        <Heading fontSize="xxx-large" className="mt-8 text-gray-700">
          First Last
        </Heading>
        <p className="max-w-lg text-left">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium
          ducimus itaque asperiores aperiam iusto officia sit pariatur dolor
          vitae iste.
        </p>
      </div>
    </div>
  );
};

export default Profile;
