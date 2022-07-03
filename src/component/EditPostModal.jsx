import React, { useEffect, useState, useContext } from "react";
import "../style/component/AddPostModal.css";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
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
  Textarea,
  Button,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
// React tag
import { TagsInput } from "react-tag-input-component";

const EditPostModal = ({ isOpen, onClose, post }) => {
  // States
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [title, setTitle] = useState(post.title);
  const [description, setDescription] = useState(post.description);
  const [tags, setTags] = useState(post.tags);
  const [infoText, setInfoText] = useState("");

  // Other hooks
  const toast = useToast();
  const { user } = useContext(AuthContext);
  const { accentColor } = useContext(SettingsContext);

  // Create post
  const handleUpdatePost = async () => {
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
      await updateDoc(doc(db, "posts", post.id), {
        title: title,
        description: description,
        tags: tags,
        imageLink: "",
        authorId: user.uid,
        updatedAt: serverTimestamp(),
      });
      toast({
        title: "Success",
        description: "Post was updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose()
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
            placeholder="Title"
            type="text"
            className="my-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            variant="filled"
            focusBorderColor={`${accentColor}.500`}
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
            colorScheme={accentColor}
            variant="solid"
            className="mr-5"
            onClick={() => {
              handleUpdatePost();
            }}
          >
            Update Post
          </Button>
          <Button colorScheme="red" variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditPostModal;
