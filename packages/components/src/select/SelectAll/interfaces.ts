import { ReactNode } from "react";
import type {SelectProps } from '../Select';

export interface ISelectItem {
  label: string;
  value: string;
}

export interface ISelectAll extends SelectProps {
  options: ISelectItem[];
  value?: string[];
  dropdownMatchSelectWidth?: boolean;
  onChange?: (v: string[]) => void;
  labelRender?: (option: ISelectItem) => ReactNode;
}
