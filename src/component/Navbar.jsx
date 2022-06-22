import React, { useState, useContext } from "react";
// Firebase
import { auth } from "../shared/FirebaseConfig";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
// Context
import { AuthContext } from "../context/Auth";
// Chakra UI
import {
  Input,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
// Icons
import { FiLogIn, FiLogOut } from "react-icons/fi";
// Components
import SignupModal from "./SignupModal";

const Navbar = () => {
  // States
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Other hooks
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Handle login
  const handleLogin = () => {
    if (!email || !password) {
      toast({
        title: "Info",
        description: "Please fill in all the fields.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user);
        setIsLoggedIn(true);
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  // Handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
    setIsLoggedIn(false);
  };

  return (
    <div className="flex justify-between items-center bg-gray-50 px-8 py-3">
      <div className="text-2xl font-bold">ForumX</div>

      {!isLoggedIn && (
        <div>
          <Popover>
            <PopoverTrigger>
              <Button colorScheme="blackAlpha" className="mr-5">
                Log In
              </Button>
            </PopoverTrigger>

            <PopoverContent>
              <PopoverArrow />
              <PopoverHeader className="font-bold">Log In</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Input
                  variant="filled"
                  placeholder="Email"
                  type="email"
                  className="my-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  variant="filled"
                  placeholder="Password"
                  type="password"
                  className="my-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  isLoading={loading}
                  leftIcon={<FiLogIn />}
                  size="sm"
                  colorScheme="blackAlpha"
                  className="my-2"
                  onClick={() => handleLogin()}
                >
                  Login
                </Button>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Button colorScheme="orange" onClick={onOpen}>
            Sign Up
          </Button>
          <SignupModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
        </div>
      )}

      {isLoggedIn && (
        <div>
          <Button
            leftIcon={<FiLogOut />}
            colorScheme="red"
            onClick={() => {
              handleLogout();
            }}
          >
            Log Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
