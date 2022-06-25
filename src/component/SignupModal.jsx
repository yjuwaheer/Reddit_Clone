import React, { useState, useContext } from "react";
// Firebase
import { auth, db } from "../shared/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
// Context
import { SettingsContext } from "../context/Settings";
// Chakra UI
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Button,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";

const SignupModal = ({ isOpen, onClose }) => {
  // States
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [infoText, setInfoText] = useState("");

  // Other hooks
  const toast = useToast();
  const { accentColor } = useContext(SettingsContext);

  // Handle signup
  const handleSignup = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setInfoText("Please fill in all the fields.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    if (password !== confirmPassword) {
      setInfoText("Passwords don't match.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return;
    }

    // Create user
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // Create user in firestore
      await setDoc(doc(db, "users", userCredential.user.uid), {
        username: username,
        email: email,
        firstName: "",
        lastName: "",
        profileBio: "",
        phoneNumber: "",
        country: "",
        backdropImageLink: "",
        profileImageLink: "",
        createdAt: serverTimestamp(),
      });
      toast({
        title: "Success",
        description: "Account was created successfully, please login.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      resetModal();
    } catch (error) {
      const errorMessage = error.message;
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // Reset modal
  const resetModal = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Sign Up</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
            placeholder="Username"
            type="text"
            className="my-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
            placeholder="Email"
            type="email"
            className="my-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
            placeholder="Password"
            type="password"
            className="my-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
            placeholder="Confirm Password"
            type="password"
            className="my-2"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {showAlert && (
            <Alert status="info" borderRadius={5} className="mt-2">
              <AlertIcon />
              {infoText}
            </Alert>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme={accentColor}
            variant="solid"
            className="mr-5"
            onClick={() => {
              handleSignup();
            }}
          >
            Sign Up
          </Button>
          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SignupModal;
