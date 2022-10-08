import { ReactNode } from "react";

export interface IText {
  children: string;
  title: ReactNode;
  subTitle?:ReactNode;
}
