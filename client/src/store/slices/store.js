import { create } from "zustand";
import { createAuthSlice } from "./auth-slice";

const useAppStore = create()((...a) => ({ ...createAuthSlice(...a) }));

export default useAppStore;
