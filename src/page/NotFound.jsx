import React, { useContext } from "react";
// Router
import { useNavigate } from "react-router-dom";
// Context
import { SettingsContext } from "../context/Settings";
// Chakra UI
import { Button,Heading } from "@chakra-ui/react";
// Icons
import { FiHome } from "react-icons/fi";

const NotFound = () => {
  // Other hooks
  const navigate = useNavigate();
  const { accentColor } = useContext(SettingsContext);

  return (
    <div
      className="flex flex-col justify-center items-center"
      style={{ height: "90vh" }}
    >
      <div className="p-16 rounded-xl shadow-lg relative z-50 border-2">
        <Heading fontSize={135} color={`${accentColor}.800`}>404</Heading>
        <Heading size="md">Page Not Found</Heading>

        <div className="absolute bg-gray-100 w-52 h-52 -top-10 -left-10 -z-50 rounded-full"></div>
        <div className="absolute bg-zinc-100 w-40 h-40 -bottom-6 -right-6 -z-50 rounded-full"></div>
      </div>

      <div className="my-20 max-w-sm text-gray-400 font-bold">
        The page you are looking for was moved, removed, renamed or never
        existed.
      </div>

      <Button
        colorScheme={accentColor}
        onClick={() => {
          navigate("/");
        }}
        leftIcon={<FiHome />}
      >
        RETURN HOME
      </Button>
    </div>
  );
};

export default NotFound;
