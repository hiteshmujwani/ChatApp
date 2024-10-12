import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Input,
  useDisclosure,
  Avatar,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { apiClient } from "../../../../../../libs/ApiClient";
import {
  SEARCH_CONTACT,
} from "../../../../../../utils/Constants";
import useAppStore from "../../../../../../store/slices/store";

export const NewDm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchedContacts,setSearchContacts] = useState([])
  const {setSelectedChatType,setSelectedChatData,setSelectedChatMessages} = useAppStore()
  

  const handleSearch = async (searchTerm) => {
    try {
      const response = await apiClient.post(
        SEARCH_CONTACT,
        { searchTerm },
        { withCredentials: true }
      );
      if(response.status == 200){
        setSearchContacts(response.data.data)
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const handleSelectContact = async(chat) =>{
    try {
      console.log(chat)
      setSelectedChatType('Contact')
      setSelectedChatData(chat)
      onOpen(false)
    } catch (error) {
      console.log(error)
    }
  }
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
            <div className="h-[200px] mt-5 overflow-hidden overflow-y-scroll">
              <div className="flex flex-col gap-3">
                {searchedContacts<=0 ? "" : searchedContacts.map((contacts)=>(
                  <div className="flex items-center gap-2 cursor-pointer" onClick={()=>handleSelectContact(contacts)} key={contacts._id}>
                  <Avatar size={"sm"} name={contacts.firstName ? contacts.firstName : contacts.email}/>
                  <div>{contacts.firstName ? contacts.firstName : contacts.email }</div>
                </div>
                ))}
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
