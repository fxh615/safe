import ConfigContext, { useIntl } from '@/pros/provider';
import type {
  ProFieldRequestData,
  ProFieldTextType,
  ProFieldValueObjectType,
  ProFieldValueType,
} from '../utils';
import {
  BaseProFieldFC,
  ProFieldFCRenderProps,
  ProRenderFieldPropsType,
} from '../provider';
import { omitUndefined, pickProProps } from '@/pros/utils';
import Avatar from '@/avatar';
// import type {RangeInputNumberProps,ExtraProps as } from './components/DigitRange'
import { noteOnce } from 'rc-util/lib/warning';
import React, { useContext } from 'react';
import FieldCascader from './components/Cascader';
import FieldCheckbox from './components/Checkbox';
import FieldCode from './components/Code';
import FieldColorPicker from './components/ColorPicker';
import FieldDatePicker from './components/DatePicker';
import FieldDigit from './components/Digit';
import FieldDigitRange from './components/DigitRange';
import FieldFromNow from './components/FromNow';
import FieldImage from './components/Image';
import FieldIndexColumn from './components/IndexColumn';
import type { FieldMoneyProps } from './components/Money';
import FieldMoney from './components/Money';
import FieldOptions from './components/Options';
import FieldPassword from './components/Password';
import FieldPercent from './components/Percent';
import FieldProgress from './components/Progress';
import FieldRadio from './components/Radio';
import FieldRangePicker from './components/RangePicker';
import FieldRate from './components/Rate';
import FieldSecond from './components/Second';
import FieldSelect, {
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
} from './components/Select';
import FieldSlider from './components/Slider';
import FieldStatus from './components/Status';
import FieldSwitch from './components/Switch';
import FieldText from './components/Text';
import FieldTextArea from './components/TextArea';
import FieldTimePicker, { FieldTimeRangePicker } from './components/TimePicker';
import FieldTreeSelect from './components/TreeSelect';
import FieldHOC from './FieldHOC';

const REQUEST_VALUE_TYPE = ['select', 'radio', 'radioButton', 'checkbook'];

export type ProFieldMoneyProps = FieldMoneyProps;

export type ProFieldEmptyText = string | false;

/** ????????? Field ????????????????????? */
// eslint-disable-next-line @typescript-eslint/ban-types
export type ProFieldFC<T = {}> = React.ForwardRefRenderFunction<
  any,
  BaseProFieldFC & ProRenderFieldPropsType & T
>;

/** ???????????????field?????? */
export type ProFieldLightProps = {
  // label???clear?????????ref
  lightLabel?: React.RefObject<{
    labelRef: React.RefObject<HTMLElement>;
    clearRef: React.RefObject<HTMLElement>;
  }>;

  // ???????????????label
  labelTrigger?: boolean;
};

/** Value type by function */
export type ProFieldValueTypeFunction<T> = (item: T) => ProFieldValueType | ProFieldValueObjectType;

type RenderProps = Omit<ProFieldFCRenderProps, 'text'> &
  ProRenderFieldPropsType & {
    /** ???????????????????????? */
    request?: ProFieldRequestData;
    emptyText?: React.ReactNode;
    visible?: boolean;
    onVisible?: (visible: boolean) => void;
    [key: string]: any;
  };

/**
 * Render valueType object
 *
 * @param text String | number
 * @param valueType ProColumnsValueObjectType
 */
const defaultRenderTextByObject = (
  text: ProFieldTextType,
  valueType: ProFieldValueObjectType,
  props: RenderProps,
) => {
  const pickFormItemProps = pickProProps(props.fieldProps);
  if (valueType.type === 'progress') {
    return (
      <FieldProgress
        {...props}
        text={text as number}
        fieldProps={{
          status: valueType.status ? valueType.status : undefined,
          ...pickFormItemProps,
        }}
      />
    );
  }
  if (valueType.type === 'money') {
    return (
      <FieldMoney
        locale={valueType.locale}
        {...props}
        fieldProps={pickFormItemProps}
        text={text as number}
        moneySymbol={valueType.moneySymbol}
      />
    );
  }
  if (valueType.type === 'percent') {
    return (
      <FieldPercent
        {...props}
        text={text as number}
        showSymbol={valueType.showSymbol}
        precision={valueType.precision}
        fieldProps={pickFormItemProps}
        showColor={valueType.showColor}
      />
    );
  }

  if (valueType.type === 'image') {
    return <FieldImage {...props} text={text as string} width={valueType.width} />;
  }

  return text as React.ReactNode;
};

/**
 * ????????????????????????????????????
 *
 * @param dataValue
 * @param valueType
 */
const defaultRenderText = (
  dataValue: ProFieldTextType,
  valueType: ProFieldValueType | ProFieldValueObjectType,
  props: RenderProps,
  valueTypeMap: Record<string, ProRenderFieldPropsType>,
): React.ReactNode => {
  const { mode = 'read', emptyText = '-' } = props;

  if (emptyText !== false && mode === 'read' && valueType !== 'option' && valueType !== 'switch') {
    if (typeof dataValue !== 'boolean' && typeof dataValue !== 'number' && !dataValue) {
      const { fieldProps, render } = props;
      if (render) {
        return render(dataValue, { mode, ...fieldProps }, <>{emptyText}</>);
      }
      return <>{emptyText}</>;
    }
  }

  // eslint-disable-next-line no-param-reassign
  delete props.emptyText;

  if (typeof valueType === 'object') {
    return defaultRenderTextByObject(dataValue, valueType, props);
  }

  const customValueTypeConfig = valueTypeMap && valueTypeMap[valueType as string];
  if (customValueTypeConfig) {
    // eslint-disable-next-line no-param-reassign
    delete props.ref;
    if (mode === 'read') {
      return customValueTypeConfig.render?.(
        dataValue,
        {
          text: dataValue as React.ReactNode,
          ...props,
          mode: mode || 'read',
        },
        <>{dataValue}</>,
      );
    }
    if (mode === 'update' || mode === 'edit') {
      return customValueTypeConfig.renderFormItem?.(
        dataValue,
        {
          text: dataValue as React.ReactNode,
          ...props,
        },
        <>{dataValue}</>,
      );
    }
  }

  const needValueEnum = REQUEST_VALUE_TYPE.includes(valueType as string);
  const hasValueEnum = !!(
    props.valueEnum ||
    props.request ||
    props.options ||
    props.fieldProps?.options
  );

  noteOnce(
    !needValueEnum || hasValueEnum,
    `??????????????? valueType ??? ${REQUEST_VALUE_TYPE.join(
      ',',
    )}?????????????????????????????????options???request, valueEnum ??????????????????????????????????????????`,
  );

  noteOnce(
    !needValueEnum || hasValueEnum,
    `If you set valueType to any of ${REQUEST_VALUE_TYPE.join(
      ',',
    )}, you need to configure options, request or valueEnum.`,
  );

  /** ????????????????????? */
  if (valueType === 'money') {
    return <FieldMoney {...props} text={dataValue as number} />;
  }

  /** ????????????????????? */
  if (valueType === 'date') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker text={dataValue as string} format="YYYY-MM-DD" {...props} />
      </FieldHOC>
    );
  }

  /** ?????????????????? */
  if (valueType === 'dateWeek') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker text={dataValue as string} format="YYYY-wo" picker="week" {...props} />
      </FieldHOC>
    );
  }

  /** ?????????????????? */
  if (valueType === 'dateMonth') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker text={dataValue as string} format="YYYY-MM" picker="month" {...props} />
      </FieldHOC>
    );
  }

  /** ????????????????????? */
  if (valueType === 'dateQuarter') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker text={dataValue as string} format="YYYY-\QQ" picker="quarter" {...props} />
      </FieldHOC>
    );
  }

  /** ?????????????????? */
  if (valueType === 'dateYear') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker text={dataValue as string} format="YYYY" picker="year" {...props} />
      </FieldHOC>
    );
  }

  /** ??????????????????????????? */
  if (valueType === 'dateRange') {
    return <FieldRangePicker text={dataValue as string[]} format="YYYY-MM-DD" {...props} />;
  }

  /** ???????????????????????????????????? */
  if (valueType === 'dateTime') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldDatePicker
          text={dataValue as string}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          {...props}
        />
      </FieldHOC>
    );
  }

  /** ?????????????????????????????????????????? */
  if (valueType === 'dateTimeRange') {
    // ??????????????????????????? "-"
    return (
      <FieldHOC isLight={props.light}>
        <FieldRangePicker
          text={dataValue as string[]}
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          {...props}
        />
      </FieldHOC>
    );
  }

  /** ??????????????????????????? */
  if (valueType === 'time') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldTimePicker text={dataValue as string} format="HH:mm:ss" {...props} />
      </FieldHOC>
    );
  }

  /** ??????????????????????????? */
  if (valueType === 'timeRange') {
    return (
      <FieldHOC isLight={props.light}>
        <FieldTimeRangePicker text={dataValue as string[]} format="HH:mm:ss" {...props} />
      </FieldHOC>
    );
  }

  if (valueType === 'fromNow') {
    return <FieldFromNow text={dataValue as string} {...props} />;
  }

  if (valueType === 'index') {
    return <FieldIndexColumn>{(dataValue as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'indexBorder') {
    return <FieldIndexColumn border>{(dataValue as number) + 1}</FieldIndexColumn>;
  }

  if (valueType === 'progress') {
    return <FieldProgress {...props} text={dataValue as number} />;
  }
  /** ?????????, ??????????????????, ?????????????????? */
  if (valueType === 'percent') {
    return <FieldPercent text={dataValue as number} {...props} />;
  }

  if (valueType === 'avatar' && typeof dataValue === 'string' && props.mode === 'read') {
    return <Avatar src={dataValue as string} size={22} shape="circle" />;
  }

  if (valueType === 'code') {
    return <FieldCode text={dataValue as string} {...props} />;
  }

  if (valueType === 'jsonCode') {
    return <FieldCode text={dataValue as string} language="json" {...props} />;
  }

  if (valueType === 'textarea') {
    return <FieldTextArea text={dataValue as string} {...props} />;
  }

  if (valueType === 'digit') {
    return <FieldDigit text={dataValue as number} {...props} />;
  }

  if (valueType === 'digitRange') {
    return <FieldDigitRange text={dataValue as number[]} {...props} />;
  }

  if (valueType === 'second') {
    return <FieldSecond text={dataValue as number} {...props} />;
  }

  if (valueType === 'select' || (valueType === 'text' && (props.valueEnum || props.request))) {
    return (
      <FieldHOC isLight={props.light}>
        <FieldSelect text={dataValue as string} {...props} />
      </FieldHOC>
    );
  }

  if (valueType === 'checkbox') {
    return <FieldCheckbox text={dataValue as string} {...props} />;
  }

  if (valueType === 'radio') {
    return <FieldRadio text={dataValue as string} {...props} />;
  }

  if (valueType === 'radioButton') {
    return <FieldRadio radioType="button" text={dataValue as string} {...props} />;
  }

  if (valueType === 'rate') {
    return <FieldRate text={dataValue as string} {...props} />;
  }
  if (valueType === 'slider') {
    return <FieldSlider text={dataValue as string} {...props} />;
  }
  if (valueType === 'switch') {
    return <FieldSwitch text={dataValue as boolean} {...props} />;
  }

  if (valueType === 'option') {
    return <FieldOptions text={dataValue as React.ReactNode} {...props} />;
  }

  if (valueType === 'password') {
    return <FieldPassword text={dataValue as string} {...props} />;
  }

  if (valueType === 'image') {
    return <FieldImage text={dataValue as string} {...props} />;
  }
  if (valueType === 'cascader') {
    return <FieldCascader text={dataValue as string} {...props} />;
  }

  if (valueType === 'treeSelect') {
    return <FieldTreeSelect text={dataValue as string} {...props} />;
  }

  if (valueType === 'color') {
    return <FieldColorPicker text={dataValue as string} {...props} />;
  }

  return <FieldText text={dataValue as string} {...props} />;
};

export { defaultRenderText };
export {
  FieldPercent,
  FieldIndexColumn,
  FieldProgress,
  FieldMoney,
  FieldDatePicker,
  FieldRangePicker,
  FieldCode,
  FieldTimePicker,
  FieldText,
  FieldStatus,
  FieldSelect,
  proFieldParsingText,
  proFieldParsingValueEnumToArray,
};
export type { ProFieldValueType, FieldMoneyProps };

/** ProField ????????? */
export type ProFieldPropsType = {
  text?: ProFieldTextType;
  valueType?: ProFieldValueType | ProFieldValueObjectType;
} & RenderProps;

const ProField: React.ForwardRefRenderFunction<any, ProFieldPropsType> = (
  { text, valueType = 'text', mode = 'read', onChange, renderFormItem, value, readonly, ...rest },
  ref: any,
) => {
  const intl = useIntl();
  const context: any = useContext(ConfigContext);

  const fieldProps = (value !== undefined || onChange || rest?.fieldProps) && {
    value,
    // fieldProps ??????????????????????????? LightFilter ?????????????????????????????? value ??? onChange
    ...omitUndefined(rest?.fieldProps),
    onChange: (...restParams: any[]) => {
      rest?.fieldProps?.onChange?.(...restParams);
      onChange?.(...restParams);
    },
  };

  return (
    <React.Fragment>
      {defaultRenderText(
        mode === 'edit' ? fieldProps?.value ?? text ?? '' : text ?? fieldProps?.value ?? '',
        valueType || 'text',
        {
          ref,
          ...rest,
          mode: readonly ? 'read' : mode,
          renderFormItem: renderFormItem
            ? (...restProps) => {
                const newDom = renderFormItem(...restProps);
                // renderFormItem ?????????dom????????????props??????????????????????????????
                if (React.isValidElement(newDom))
                  return React.cloneElement(newDom, {
                    placeholder:
                      rest.placeholder || intl.getMessage('tableForm.inputPlaceholder', '?????????'),
                    ...fieldProps,
                    ...((newDom.props as any) || {}),
                  });
                return newDom;
              }
            : undefined,
          placeholder: rest.placeholder || intl.getMessage('tableForm.inputPlaceholder', '?????????'),
          fieldProps: pickProProps(fieldProps),
        },
        context.valueTypeMap,
      )}
    </React.Fragment>
  );
};

export default React.forwardRef(ProField) as typeof ProField;
