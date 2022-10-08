import classNames from 'classnames';
import RcCheckbox from 'rc-checkbox';
import * as React from 'react';
import { useContext } from 'react';
import { ConfigContext } from '../config-provider';
import { FormItemInputContext } from '../form/context';
import warning from '../_util/warning';
import { GroupContext } from './Group';
import DisabledContext from '../config-provider/DisabledContext';

export interface AbstractCheckboxProps<T> {
  prefixCls?: string;
  className?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  style?: React.CSSProperties;
  disabled?: boolean;
  onChange?: (e: T) => void;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onMouseEnter?: React.MouseEventHandler<HTMLElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLElement>;
  onKeyPress?: React.KeyboardEventHandler<HTMLElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLElement>;
  value?: any;
  tabIndex?: number;
  name?: string;
  children?: React.ReactNode;
  id?: string;
  autoFocus?: boolean;
  type?: string;
  skipGroup?: boolean;
}

export interface CheckboxChangeEventTarget extends CheckboxProps {
  checked: boolean;
}

export interface CheckboxChangeEvent {
  target: CheckboxChangeEventTarget;
  stopPropagation: () => void;
  preventDefault: () => void;
  nativeEvent: MouseEvent;
}

export interface CheckboxProps extends AbstractCheckboxProps<CheckboxChangeEvent> {
  indeterminate?: boolean;
}

const InternalCheckbox: React.ForwardRefRenderFunction<HTMLInputElement, CheckboxProps> = (
  {
    prefixCls: customizePrefixCls,
    className,
    children,
    indeterminate = false,
    style,
    onMouseEnter,
    onMouseLeave,
    skipGroup = false,
    disabled,
    ...restProps
  },
  ref,
) => {
  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const checkboxGroup = React.useContext(GroupContext);
  const { isFormItemInput } = useContext(FormItemInputContext);
  const contextDisabled = useContext(DisabledContext);
  const mergedDisabled = disabled || checkboxGroup?.disabled || contextDisabled;

  const prevValue = React.useRef(restProps.value);

  React.useEffect(() => {
    checkboxGroup?.registerValue(restProps.value);
    warning(
      'checked' in restProps || !!checkboxGroup || !('value' in restProps),
      'Checkbox',
      '`value` is not a valid prop, do you mean `checked`?',
    );
  }, []);

  React.useEffect(() => {
    if (skipGroup) {
      return;
    }
    if (restProps.value !== prevValue.current) {
      checkboxGroup?.cancelValue(prevValue.current);
      checkboxGroup?.registerValue(restProps.value);
      prevValue.current = restProps.value;
    }
    return () => checkboxGroup?.cancelValue(restProps.value);
  }, [restProps.value]);

  const prefixCls = getPrefixCls('checkbox', customizePrefixCls);
  const checkboxProps: CheckboxProps = { ...restProps };
  if (checkboxGroup && !skipGroup) {
    checkboxProps.onChange = (...args) => {
      if (restProps.onChange) {
        restProps.onChange(...args);
      }
      if (checkboxGroup.toggleOption) {
        checkboxGroup.toggleOption({ label: children, value: restProps.value });
      }
    };
    checkboxProps.name = checkboxGroup.name;
    checkboxProps.checked = checkboxGroup.value.indexOf(restProps.value) !== -1;
  }
  const classString = classNames(
    {
      [`${prefixCls}-wrapper`]: true,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-wrapper-checked`]: checkboxProps.checked,
      [`${prefixCls}-wrapper-disabled`]: mergedDisabled,
      [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput,
    },
    className,
  );
  const checkboxClass = classNames({
    [`${prefixCls}-indeterminate`]: indeterminate,
  });
  const ariaChecked = indeterminate ? 'mixed' : undefined;
  return (
    <label
      className={classString}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* @ts-ignore */}
      <RcCheckbox
        aria-checked={ariaChecked}
        {...checkboxProps}
        prefixCls={prefixCls}
        className={checkboxClass}
        disabled={mergedDisabled}

        // @ts-ignore
        ref={ref}
      />
      {children !== undefined && <span>{children}</span>}
    </label>
  );
};

const Checkbox = React.forwardRef<unknown, CheckboxProps>(InternalCheckbox as any);
if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}

export default Checkbox;
