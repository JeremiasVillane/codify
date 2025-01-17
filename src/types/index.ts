import { LANGUAGES } from "../constants";

export type Language = (typeof LANGUAGES)[number];

export type ActionConfig = {
  fn: (...args: any[]) => void;
  description: string;
};
