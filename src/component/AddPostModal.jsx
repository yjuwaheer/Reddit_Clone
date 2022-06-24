import React, { useState, useContext } from "react";
import "../style/component/AddPostModal.css";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
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
  Textarea,
  Button,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
// React tag
import { TagsInput } from "react-tag-input-component";

const AddPostModal = ({ isOpen, onClose }) => {
  // States
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [infoText, setInfoText] = useState("");

  // Other hooks
  const toast = useToast();
  const { user } = useContext(AuthContext);

  // Create post
  const handleCreatePost = async () => {
    if (!title || !description) {
      setInfoText("Title and description are required.");
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      return;
    }

    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title: title,
        description: description,
        tags: tags,
        imageLink: "",
        postedBy: "",
        authorId: user.uid,
        votes: 0,
        commentsCount: 0,
        postedAt: serverTimestamp(),
      });
      toast({
        title: "Success",
        description: "Post was created successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetModal();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // Reset modal
  const resetModal = () => {
    setTitle("");
    setDescription("");
    setTags([]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            variant="filled"
            focusBorderColor="orange.500"
            placeholder="Title"
            type="text"
            className="my-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="filled"
            focusBorderColor="orange.500"
            placeholder="Description"
            type="text"
            className="my-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TagsInput
            value={tags}
            onChange={setTags}
            name="tags"
            placeHolder="Enter tags"
          />

          {showAlert && (
            <Alert status="info" borderRadius={5} className="mt-4">
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
              handleCreatePost();
            }}
          >
            Create Post
          </Button>
          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPostModal;
