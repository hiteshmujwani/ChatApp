export const createAuthSlice = (set) => ({
  userInfo: undefined,
  setUserInfo: (data) => set({ userInfo: data }),
});
