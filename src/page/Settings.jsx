import React, { useEffect, useState, useContext } from "react";
// Firebase
import { db } from "../shared/FirebaseConfig";
import { getDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";
// Context
import { AuthContext } from "../context/Auth";
import { SettingsContext } from "../context/Settings";
// Chakra UI
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Text,
  Button,
  Input,
  Textarea,
  Select,
  Tooltip,
  useToast,
  position,
} from "@chakra-ui/react";
// Icons
import { BsFillQuestionCircleFill } from "react-icons/bs";
// Country list
import countryList from "react-select-country-list";

const Settings = () => {
  // States
  const [userdata, setUserData] = useState({});
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [isDisabled, setIsDisabled] = useState(true);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profileBio, setProfileBio] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");

  // Other hooks
  const { user } = useContext(AuthContext);
  const { accentColor, setAccentColor, setFont } = useContext(SettingsContext);
  const toast = useToast();

  useEffect(() => {
    const getUserData = async () => {
      setLoadingUserData(true);
      const docSnap = await getDoc(doc(db, "users", user.uid));
      setUserData(docSnap.data());
      populateFields(docSnap.data());
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

  // Populate fields with user data
  const populateFields = (data) => {
    setEmail(data.email);
    setFirstName(data.firstName);
    setLastName(data.lastName);
    setProfileBio(data.profileBio);
    setUsername(data.username);
    setPhoneNumber(data.phoneNumber);
    setCountry(data.country);
  };

  // Toggle whether fields are editable or not
  const toggleFields = () => {
    if (!isDisabled) {
      updateUserData();
    }

    setIsDisabled(!isDisabled);
  };

  // Update user data
  const updateUserData = async () => {
    const updated = await updateDoc(doc(db, "users", user.uid), {
      username: username,
      firstName: firstName,
      lastName: lastName,
      profileBio: profileBio,
      phoneNumber: phoneNumber,
      country: country,
      lastUpdatedAt: serverTimestamp(),
    });
    toast({
      title: "Success",
      description: "Account was updated successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      variant: "left-accent",
      position: "bottom-right",
    });
  };

  // Update accent color
  const updateAccentColor = (color) => {
    setAccentColor(color);
    localStorage.setItem("accentColor", color);
  };

  // Update font style
  const updateFont = (font) => {
    setFont(font);
    localStorage.setItem("fontStyle", font);
  };

  return (
    <div className="flex justify-center mt-10">
      <Tabs variant="soft-rounded" colorScheme={accentColor} className="w-1/2">
        <TabList>
          <Tab>Account</Tab>
          <Tab>Appearance</Tab>
        </TabList>
        <Divider className="mt-4" />
        <TabPanels>
          {/* Account settings panel */}
          <TabPanel className="w-full flex flex-col items-start">
            <Text
              fontSize="lg"
              className="flex items-center font-medium my-3 underline underline-offset-1"
            >
              Email
              <Tooltip hasArrow label="Cannot be changed" placement="right-end">
                <span className="ml-1">
                  <BsFillQuestionCircleFill className="text-gray-500 hover:text-black" />
                </span>
              </Tooltip>
            </Text>
            <Input
              variant="filled"
              placeholder="Email"
              isDisabled={true}
              className="mb-3"
              value={email}
              onChange={() => {}}
            />

            <div className="flex w-full mb-3">
              <div className="flex flex-col items-start w-1/2 mr-4">
                <Text
                  fontSize="lg"
                  className="font-medium my-3 underline underline-offset-1"
                >
                  First Name
                </Text>
                <Input
                  isDisabled={isDisabled}
                  variant="filled"
                  focusBorderColor={`${accentColor}.500`}
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col items-start w-1/2">
                <Text
                  fontSize="lg"
                  className="font-medium my-3 underline underline-offset-1"
                >
                  Last Name
                </Text>
                <Input
                  isDisabled={isDisabled}
                  variant="filled"
                  focusBorderColor={`${accentColor}.500`}
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
            </div>

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Profile Bio
            </Text>
            <Textarea
              isDisabled={isDisabled}
              variant="filled"
              focusBorderColor={`${accentColor}.500`}
              placeholder="Tell us a bit about you"
              className="mb-3"
              value={profileBio}
              onChange={(e) => {
                setProfileBio(e.target.value);
              }}
            />

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Username
            </Text>
            <Input
              isDisabled={isDisabled}
              variant="filled"
              focusBorderColor={`${accentColor}.500`}
              placeholder="Username"
              className="mb-3"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Phone Number
            </Text>
            <Input
              isDisabled={isDisabled}
              variant="filled"
              focusBorderColor={`${accentColor}.500`}
              placeholder="Phone Number"
              className="mb-3"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Country
            </Text>
            <Select
              isDisabled={isDisabled}
              variant="filled"
              focusBorderColor={`${accentColor}.500`}
              placeholder="Select Country"
              className="mb-3"
              value={country}
              onChange={(e) => {
                setCountry(e.target.value);
              }}
            >
              {countryList()
                .getData()
                .map((country) => (
                  <option value={country.value} key={country.value}>
                    {country.label} - {country.value}
                  </option>
                ))}
            </Select>

            <div className="mt-4 self-end">
              <Button
                colorScheme={accentColor}
                onClick={() => {
                  toggleFields();
                }}
              >
                {isDisabled ? "Edit Fields" : "Lock & Save"}
              </Button>
            </div>
          </TabPanel>

          {/* Appearance settings panel */}
          <TabPanel className="w-full flex flex-col items-start">
            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Choose your accent color
            </Text>
            <div className="mb-3">
              <Button
                colorScheme="orange"
                className="mr-3"
                onClick={() => {
                  updateAccentColor("orange");
                }}
              ></Button>
              <Button
                colorScheme="red"
                className="mr-3"
                onClick={() => {
                  updateAccentColor("red");
                }}
              ></Button>
              <Button
                colorScheme="yellow"
                className="mr-3"
                onClick={() => {
                  updateAccentColor("yellow");
                }}
              ></Button>
              <Button
                colorScheme="green"
                className="mr-3"
                onClick={() => {
                  updateAccentColor("green");
                }}
              ></Button>
              <Button
                colorScheme="blue"
                className="mr-3"
                onClick={() => {
                  updateAccentColor("blue");
                }}
              ></Button>
            </div>

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Select your font style
            </Text>
            <div className="mb-3 text-start">
              <Button
                variant="outline"
                colorScheme={accentColor}
                className="mr-3 mb-1"
                onClick={() => {
                  updateFont("Poppins");
                }}
              >
                Poppins
              </Button>
              <Button
                variant="outline"
                colorScheme={accentColor}
                className="mr-3 mb-1"
                onClick={() => {
                  updateFont("Raleway");
                }}
              >
                Raleway
              </Button>
              <Button
                variant="outline"
                colorScheme={accentColor}
                className="mr-3 mb-1"
                onClick={() => {
                  updateFont("Overpass");
                }}
              >
                Overpass
              </Button>
              <Button
                variant="outline"
                colorScheme={accentColor}
                className="mr-3 mb-1"
                onClick={() => {
                  updateFont("Oxygen");
                }}
              >
                Oxygen
              </Button>
              <Button
                variant="outline"
                colorScheme="gray"
                className="mr-3 mb-1"
                onClick={() => {
                  updateFont("");
                }}
              >
                Default
              </Button>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Settings;
