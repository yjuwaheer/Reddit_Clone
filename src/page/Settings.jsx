import React from "react";
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
} from "@chakra-ui/react";
// Country list
import countryList from "react-select-country-list";

const Settings = () => {
  return (
    <div className="flex justify-center mt-10">
      <Tabs variant="soft-rounded" colorScheme="orange" className="w-1/2">
        <TabList>
          <Tab>Account</Tab>
          <Tab>Appearance</Tab>
        </TabList>
        <Divider className="mt-4" />
        <TabPanels>
          <TabPanel className="w-full flex flex-col items-start">
            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Email
            </Text>
            <Input
              variant="filled"
              placeholder="Email"
              isDisabled={true}
              value="example@gmail.com"
              onChange={() => {}}
              className="mb-3"
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
                  variant="filled"
                  focusBorderColor="orange.500"
                  placeholder="First Name"
                  value=""
                  onChange={() => {}}
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
                  variant="filled"
                  focusBorderColor="orange.500"
                  placeholder="Last Name"
                  value=""
                  onChange={() => {}}
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
              variant="filled"
              focusBorderColor="orange.500"
              placeholder="Tell us a bit about you"
              value=""
              className="mb-3"
              onChange={() => {}}
            />

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Username
            </Text>
            <Input
              variant="filled"
              focusBorderColor="orange.500"
              placeholder="Username"
              value=""
              className="mb-3"
              onChange={() => {}}
            />

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Phone Number
            </Text>
            <Input
              variant="filled"
              focusBorderColor="orange.500"
              placeholder="Phone Number"
              value=""
              className="mb-3"
              onChange={() => {}}
            />

            <Text
              fontSize="lg"
              className="font-medium my-3 underline underline-offset-1"
            >
              Country
            </Text>
            <Select
              variant="filled"
              focusBorderColor="orange.500"
              placeholder="Select Country"
              value=""
              className="mb-3"
              onChange={() => {}}
            >
              {countryList()
                .getData()
                .map((country) => (
                  <option value={country.value} key={country.value}>
                    {country.label} - {country.value}
                  </option>
                ))}
            </Select>
          </TabPanel>

          <TabPanel className="w-full flex flex-col items-start">
            <Text
              fontSize="lg"
              className="font-medium mb-3 underline underline-offset-1"
            >
              Choose your accent color
            </Text>
            <div>
              <Button colorScheme="orange" className="mr-3"></Button>
              <Button colorScheme="red" className="mr-3"></Button>
              <Button colorScheme="yellow" className="mr-3"></Button>
              <Button colorScheme="green" className="mr-3"></Button>
              <Button colorScheme="blue" className="mr-3"></Button>
            </div>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Settings;
