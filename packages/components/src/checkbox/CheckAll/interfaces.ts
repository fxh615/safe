export interface ICheckItem {
  label: string;
  value: string;
  children?: ICheckItem[];
}

export interface ICheckAll {
  dataSource: ICheckItem[];
  defaultValue?: any;
  layout?: 'inline' | null;
  onChange?: (v: any) => void
}
