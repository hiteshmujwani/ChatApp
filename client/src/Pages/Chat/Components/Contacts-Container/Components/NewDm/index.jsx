import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "@chakra-ui/react";
import { apiClient } from "../../../../../../libs/ApiClient";
import {
  CONTACT_ROUTE,
  SEARCH_CONTACT,
} from "../../../../../../utils/Constants";

export const NewDm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleSearch = async (searchTerm) => {
    try {
      console.log(searchTerm);
      const response = await apiClient.post(
        SEARCH_CONTACT,
        { searchTerm },
        { withCredentials: true }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <FaPlus
        color="#848484"
        className=" hover:!text-white duration-200 cursor-pointer"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"#242423"} textColor={"#ffffff"}>
          <ModalHeader>Search Contacts</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                placeholder="Search New Contact"
                onChange={(e) => handleSearch(e.target.value)}
                _focusVisible={false}
              />
            </FormControl>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
