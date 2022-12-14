import { useIntl } from '@/pros/provider';
import { FieldLabel, parseValueToMoment } from '@/pros/utils';
import type { DatePickerProps } from '@/date-picker';
import ConfigProvider from '@/config-provider';
import DatePicker from '@/date-picker';
import moment from 'moment';
import React, { useContext, useState } from 'react';
import type { ProFieldFC, ProFieldLightProps } from '../../index';
import './index.less';

const formatDate = (text: any, format: any) => {
  if (!text) {
    return '-';
  }
  if (typeof format === 'function') {
    return format(moment(text));
  } else {
    return moment(text).format(format || 'YYYY-MM-DD');
  }
};

/**
 * 日期选择组件
 *
 * @param
 */
const FieldDatePicker: ProFieldFC<
  {
    text: string | number;
    format: string;
    showTime?: boolean;
    bordered?: boolean;
    picker?: DatePickerProps['picker'];
  } & ProFieldLightProps
> = (
  {
    text,
    mode,
    format,
    label,
    light,
    render,
    renderFormItem,
    plain,
    showTime,
    fieldProps,
    picker,
    bordered,
    lightLabel,
    labelTrigger,
  },
  ref,
) => {
  const intl = useIntl();
  const size = useContext(ConfigProvider.SizeContext);
  const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const prefixCls = getPrefixCls('pro-field-date-picker');
  const [open, setOpen] = useState<boolean>(false);

  if (mode === 'read') {
    const dom = formatDate(text, fieldProps.format || format);
    if (render) {
      return render(text, { mode, ...fieldProps }, <>{dom}</>);
    }
    return <>{dom}</>;
  }
  if (mode === 'edit' || mode === 'update') {
    let dom;
    const {
      disabled,
      value,
      onChange,
      allowClear,
      placeholder = intl.getMessage('tableForm.selectPlaceholder', '请选择'),
    } = fieldProps;

    const momentValue = parseValueToMoment(value) as moment.Moment;

    if (light) {
      const valueStr: string = (momentValue && momentValue.format(format)) || '';
      dom = (
        <div
          className={`${prefixCls}-light`}
          onClick={(e) => {
            // 点击label切换下拉菜单
            const isLabelClick = lightLabel?.current?.labelRef?.current?.contains(
              e.target as HTMLElement,
            );

            if (isLabelClick) {
              setOpen(!open);
            } else {
              setOpen(true);
            }
          }}
        >
          <DatePicker
            picker={picker}
            showTime={showTime}
            format={format}
            ref={ref}
            {...fieldProps}
            value={momentValue}
            onChange={(v: any) => {
              onChange?.(v);
              setTimeout(() => {
                setOpen(false);
              }, 0);
            }}
            onOpenChange={(isOpen: any) => {
              if (!labelTrigger) {
                setOpen(isOpen);
              }
            }}
            open={open}
          />
          <FieldLabel
            label={label}
            disabled={disabled}
            placeholder={placeholder}
            size={size}
            value={valueStr}
            onClear={() => {
              onChange?.(null);
            }}
            allowClear={allowClear}
            bordered={bordered}
            expanded={open}
            ref={lightLabel}
          />
        </div>
      );
    } else {
      dom = (
        <DatePicker
          picker={picker}
          showTime={showTime}
          format={format}
          placeholder={placeholder}
          bordered={plain === undefined ? true : !plain}
          ref={ref}
          {...fieldProps}
          value={momentValue}
        />
      );
    }
    if (renderFormItem) {
      return renderFormItem(text, { mode, ...fieldProps }, dom);
    }
    return dom;
  }
  return null;
};
export default React.forwardRef(FieldDatePicker);
