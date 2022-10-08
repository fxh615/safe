import type { SliderSingleProps } from '@/slider';
import type { SliderBaseProps, SliderRangeProps } from '@/slider';
import React from 'react';
import type { ProFormFieldItemProps } from '../../interface';
import ProField from '../Field';

export type ProFormSliderProps = ProFormFieldItemProps<
  SliderSingleProps | SliderRangeProps,
  unknown
> & {
  range?: boolean;
  min?: SliderBaseProps['min'];
  max?: SliderBaseProps['max'];
  step?: SliderBaseProps['step'];
  marks?: SliderBaseProps['marks'];
  vertical?: SliderBaseProps['vertical'];
};
/**
 * 文本选择组件
 *
 * @param
 */
const ProFormSlider: React.ForwardRefRenderFunction<any, ProFormSliderProps> = (
  { fieldProps, proFieldProps, min, max, step, marks, vertical, range, ...rest },
  ref,
) => {
  return (
    <ProField
      valueType="slider"
      fieldProps={{
        ...fieldProps,
        min,
        max,
        step,
        marks,
        vertical,
        range,
        style: {
          minWidth: 120,
          ...fieldProps?.style,
        },
      }}
      ref={ref}
      proFieldProps={proFieldProps}
      filedConfig={{
        ignoreWidth: true,
      }}
      {...rest}
    />
  );
};

export default ProFormSlider;