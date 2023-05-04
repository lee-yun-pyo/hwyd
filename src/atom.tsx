import { atom } from "recoil";

export const formState = atom<boolean>({
  key: "formState",
  default: false,
});

export const userIdState = atom<string | null>({
  key: "userIdState",
  default: null,
});

export const modalState = atom<string | null>({
  key: "modalState",
  default: null,
});
