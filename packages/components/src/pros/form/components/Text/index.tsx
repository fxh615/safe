import type { InputProps } from '@/input';
import type { InputRef, PasswordProps } from '@/input';
import React from 'react';
import type { ProFormFieldItemProps } from '../../interface';
import ProField from '../Field';

const valueType = 'text' as const;
/**
 * 文本组件
 *
 * @param
 */
const ProFormText: React.FC<ProFormFieldItemProps<InputProps, InputRef>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<InputProps, InputRef>) => {
  return (
    <ProField
      valueType={valueType}
      fieldProps={fieldProps}
      filedConfig={
        {
          valueType,
        } as const
      }
      proFieldProps={proFieldProps}
      {...rest}
    />
  );
};

const Password: React.FC<ProFormFieldItemProps<PasswordProps, InputRef>> = ({
  fieldProps,
  proFieldProps,
  ...rest
}: ProFormFieldItemProps<InputProps, InputRef>) => {
  return (
    <ProField
      valueType="password"
      fieldProps={fieldProps}
      proFieldProps={proFieldProps}
      filedConfig={
        {
          valueType,
        } as const
      }
      {...rest}
    />
  );
};

const WrappedProFormText: typeof ProFormText & {
  Password: typeof Password;
} = ProFormText as any;

WrappedProFormText.Password = Password;

// @ts-ignore
// eslint-disable-next-line no-param-reassign
WrappedProFormText.displayName = 'ProFormComponent';

export default WrappedProFormText;
