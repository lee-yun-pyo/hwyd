import { atom } from "recoil";

export const formState = atom<boolean>({
  key: "formState",
  default: false,
});

export const userIdState = atom<string | null>({
  key: "userIdState",
  default: null,
});

export const selectedState = atom<string | null>({
  key: "selectedState",
  default: null,
});
