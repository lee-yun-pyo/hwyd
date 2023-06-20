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

interface IFormData {
  score: number;
  with: string;
  etc?: string;
  done: string;
  memo?: string;
}

export const selectedDataState = atom<IFormData | null>({
  key: "selectedDataState",
  default: null,
});

interface IScoreObj {
  date: number;
  score: number;
}

export const scoreObjState = atom<IScoreObj[]>({
  key: "scoreObjState",
  default: [],
});

export const scoreDaysState = atom<number[]>({
  key: "scoreDaysState",
  default: [],
});
