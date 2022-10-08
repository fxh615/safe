import type * as React from 'react';
import type { CheckboxProps } from './Checkbox';
import InternalCheckbox from './Checkbox';
import Group from './Group';
import {CheckAll} from './CheckAll';
import './style/index.less';

export { CheckboxChangeEvent, CheckboxProps } from './Checkbox';
export { CheckboxGroupProps, CheckboxOptionType, CheckboxValueType } from './Group';

interface CompoundedComponent
  extends React.ForwardRefExoticComponent<CheckboxProps & React.RefAttributes<HTMLInputElement>> {
  Group: typeof Group;
  CheckAll: typeof CheckAll;
  __ANT_CHECKBOX: boolean;
}

const Checkbox = InternalCheckbox as CompoundedComponent;

Checkbox.Group = Group;
Checkbox.CheckAll = CheckAll;
Checkbox.__ANT_CHECKBOX = true;

export default Checkbox;
