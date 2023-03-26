import { atom } from "recoil";

export const formState = atom<boolean>({
  key: "formState",
  default: false,
});
