import React, { useState } from "react";
// Firebase
import { auth } from "../shared/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [infoText, setInfoText] = useState("");

  // Other hooks
  const toast = useToast();

  // Handle signup
  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
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

    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast({
          title: "Success",
          description: "Account was created successfully, please login.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        resetModal();
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

  // Reset modal
  const resetModal = () => {
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
          <Input
            variant="filled"
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
            colorScheme="orange"
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
