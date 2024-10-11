import { Divider, Icon } from '@chakra-ui/react'
import React from 'react'
import { IoIosChatboxes } from 'react-icons/io'
import { GoDotFill } from "react-icons/go";



const ContactsContainer = () => {
  return (
    <div className='bg-[#242423] text-white w-[25vw] flex flex-col '>
      <div className='flex gap-2 items-center p-5'>
      <Icon
        as={IoIosChatboxes}
        color={"white"}
        height={10}
        width={10}
        />
        <div className='text-2xl'>Socialize</div>
      </div>
      <Divider/>
      <div className="flex flex-col p-5 gap-1">
        <div className='flex gap-1 items-center'>
            <GoDotFill/>
            <Title title={"Direct Messages"}/>
        </div>
        <div className='flex gap-1 items-center'>
            <GoDotFill/>
            <Title title={"Channels"}/>
        </div>
      </div>
    </div>
  )
}

const Title = ({title}) =>{
    return (
    <div className=''>
        <h6>{title}</h6>
    </div>
    )
}

export default ContactsContainer
