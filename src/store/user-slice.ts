import { getUserAction } from "@/actions/AuthAction";
import { StateCreator } from "zustand";

// Define the UserState type
export type UserState = {
  firstName: string;
  lastName: string;
  zipCode: string;
};

export type UserActions = {
  fetchAndSetUser: () => Promise<void>;
  setZipCode: (zipCode: string) => void;
  reset: () => void;
};

export type UserSlice = UserState & UserActions;

const initialState: UserState = {
  firstName: "",
  lastName: "",
  zipCode: "",
};

export const createUserSlice: StateCreator<
  UserSlice,
  [["zustand/immer", never]],
  [],
  UserSlice
> = (set) => ({
  ...initialState,
  setZipCode: (zipCode) =>
    set((state) => {
      state.zipCode = zipCode;
    }),
  fetchAndSetUser: async () => {
    const user = await getUserAction();
    if (user) {
      set((state) => {
        state.firstName = user.firstName;
        state.lastName = user.lastName;
      });
    }
  },
  // FIXME: there's a bug in resetting the user state
  reset: () => set(() => initialState),
});
