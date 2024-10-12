export const createChatSlice = (set,get) => ({
    selectedChatType:undefined,
    selectedChatData:undefined,
    selectedChatMessages:undefined,
    setSelectedChatType:(chatType)=>set({selectedChatType:chatType}),
    setSelectedChatData:(chatData)=>set({selectedChatData:chatData}),
    setSelectedChatMessages:(chatData)=>set({selectedChatData:chatData}),
    closeChat:(data)=>set({
        selectedChatData:undefined,
        selectedChatType:undefined,
        selectedChatMessages:undefined
    })
  });
  