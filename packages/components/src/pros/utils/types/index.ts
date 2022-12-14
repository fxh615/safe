import type { SketchPickerProps } from '@chenshuai2144/sketch-color';
import type {AvatarProps} from '@/avatar';
import type {CascaderProps} from '@/cascader';
import type {CheckboxProps} from '@/checkbox';
import type {DatePickerProps} from '@/date-picker';
import type {FormInstance} from '@/form';
import type {ImageProps} from '@/image';
import type {InputNumberProps} from '@/input-number';
import type {InputProps} from '@/input';
import type {PopoverProps} from '@/popover';
import type {ProgressProps} from '@/progress';
import type {RadioProps} from '@/radio';
import type {RateProps} from '@/rate';
import type {SelectProps} from '@/select/Select';
import type {SliderSingleProps} from '@/slider';
import type {SwitchProps} from '@/switch';
import type {TimeRangePickerProps} from '@/time-picker';
import type {TreeSelectProps} from '@/tree-select';
import type { RangePickerProps } from '@/date-picker';
import type { PasswordProps, TextAreaProps } from '@/input';
import type { SliderRangeProps } from '@/slider';
import type { ProFieldRequestData, ProSchema } from '../typing';

export interface ProFieldValueTypeWithFieldProps {
  text: InputProps;
  password: PasswordProps;
  money: Record<string, any>;
  index: Record<string, any>;
  indexBorder: Record<string, any>;
  option: Record<string, any>;
  textarea: TextAreaProps;
  date: DatePickerProps;
  dateWeek: DatePickerProps;
  dateMonth: DatePickerProps;
  dateQuarter: DatePickerProps;
  dateYear: DatePickerProps;
  dateTime: DatePickerProps;
  fromNow: DatePickerProps;
  dateRange: RangePickerProps;
  dateTimeRange: RangePickerProps;
  time: TimeRangePickerProps;
  timeRange: TimeRangePickerProps;
  select: SelectProps;
  checkbox: CheckboxProps;
  rate: RateProps;
  slider: SliderSingleProps | SliderRangeProps;
  radio: RadioProps;
  radioButton: RadioProps;
  progress: ProgressProps;
  percent: InputNumberProps;
  digit: InputNumberProps;
  digitRange: InputNumberProps;
  second: InputNumberProps;
  code: InputProps | TextAreaProps;
  jsonCode: InputProps | TextAreaProps;
  avatar: AvatarProps;
  switch: SwitchProps;
  image: ImageProps | InputProps;
  cascader: CascaderProps<any>;
  treeSelect: TreeSelectProps;
  color: SketchPickerProps & {
    value?: string;
    popoverProps?: PopoverProps;
    mode?: 'read' | 'edit';
    onChange?: (color: string) => void;
    colors?: string[];
  };
}

/**
 * @param textarea ?????????
 * @param password ?????????
 * @param money ?????? option ?????? ????????????????????????
 * @param date ?????? YYYY-MM-DD
 * @param dateWeek ????????????
 * @param dateMonth ????????????
 * @param dateQuarter ???????????????
 * @param dateYear ????????????
 * @param dateRange ???????????? YYYY-MM-DD[]
 * @param dateTime ??????????????? YYYY-MM-DD HH:mm:ss
 * @param dateTimeRange ????????????????????? YYYY-MM-DD HH:mm:ss[]
 * @param time: ?????? HH:mm:ss
 * @param timeRange: ???????????? HH:mm:ss[]
 * @param index?????????
 * @param indexBorder?????????
 * @param progress: ?????????
 * @param percent: ?????????
 * @param digit ??????
 * @param second ??????
 * @param fromNow ?????????????????????
 * @param avatar ??????
 * @param code ?????????
 * @param image ????????????
 * @param jsonCode Json ?????????????????????????????????
 * @param color ???????????????
 * @param color ???????????????
 */
export type ProFieldValueType = Extract<keyof ProFieldValueTypeWithFieldProps, any>;

type FieldPropsTypeBase<Entity, ComponentsType, ExtraProps, FieldPropsType> =
  | ((
      form: FormInstance<any>,
      config: ProSchema<Entity, ExtraProps> & {
        type: ComponentsType;
        isEditable?: boolean;
        rowKey?: string;
        rowIndex: number;
        entity: Entity;
      },
    ) => FieldPropsType | Record<string, any>)
  | FieldPropsType
  | Record<string, any>;

export type ProFieldValueObject<Type> = Type extends 'progress' | 'money' | 'percent' | 'image'
  ? {
      type: Type;
      status?: 'normal' | 'active' | 'success' | 'exception' | undefined;
      locale?: string;
      /** Percent */
      showSymbol?: ((value: any) => boolean) | boolean;
      showColor?: boolean;
      precision?: number;
      moneySymbol?: boolean;
      request?: ProFieldRequestData;
      /** Image */
      width?: number;
    }
  : never;

type ValueTypeWithFieldPropsBase<Entity, ComponentsType, ExtraProps, Type> = {
  valueType?:
    | Type
    | ProFieldValueObject<Type>
    | ((entity: Entity, type: ComponentsType) => Type | ProFieldValueObject<Type>);
  fieldProps?: FieldPropsTypeBase<
    Entity,
    ComponentsType,
    ExtraProps,
    ProFieldValueTypeWithFieldProps[ProFieldValueType]
  >;
};

type UnionSameValueType<Type> = Type extends any
  ? Type extends ProFieldValueType
    ? never
    : Type
  : never;

export type ValueTypeWithFieldProps<Entity, ComponentsType, ExtraProps, ValueType> =
  ValueTypeWithFieldPropsBase<
    Entity,
    ComponentsType,
    ExtraProps,
    ProFieldValueType | UnionSameValueType<ValueType> | undefined
  >;
