import useAppStore from "./store";

export const createChatSlice = (set,get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:[],
    dmContactsList:[],
    setSelectedChatType:(selectedChatType)=>set({selectedChatType}),
    setSelectedChatData:(selectedChatData)=>set({selectedChatData}),
    setSelectedChatMessages:(selectedChatMessages)=>set({selectedChatMessages}),
    setDmContactsList:(dmContactsList)=>set({dmContactsList}),
    closeChat:()=>set({
        selectedChatData:undefined,
        selectedChatType:undefined,
        selectedChatMessages:[]
    }),
    addMessage:(message)=>{
        console.log(message)
        const selectedChatMessages = get().selectedChatMessages;
        const selectedChatType = get().selectedChatType;

        set({
            selectedChatMessages:[
                ...selectedChatMessages,{
                    ...message,
                    sender:selectedChatType == "channel" ? message.sender : message.sender._id,
                    receiver:selectedChatType == "channel" ? message.receiver : message.receiver._id

                }
            ]
        })


    }
  });
  