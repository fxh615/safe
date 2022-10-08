import { omitUndefined } from '@/pros/utils';
import {omit} from 'ramda';
import type { ProFormFieldProps } from '../../Field';
import ProFormField from '../../Field';
import type { ProSchemaRenderValueTypeFunction } from '../typing';

export const field: ProSchemaRenderValueTypeFunction = (
  item,
  { action, formRef, type, originItem },
) => {
  /** 公用的 类型 props */
  const formFieldProps: Omit<ProFormFieldProps, 'fieldProps' | 'formItemProps'> = {
    ...omit(['dataIndex', 'width', 'render', 'renderFormItem', 'renderText', 'title'], item),
    name: item.dataIndex,
    width: item.width as 'md',
    render: item?.render
      ? (dom: any, entity: any, renderIndex: any) =>
          item?.render?.(dom, entity, renderIndex, action?.current, {
            type,
            ...item,
            formItemProps: item.getFormItemProps?.(),
            fieldProps: item.getFieldProps?.(),
          })
      : undefined,
  };

  const defaultRender = () => {
    return <ProFormField {...formFieldProps} ignoreFormItem={true} />;
  };

  const renderFormItem = item?.renderFormItem
    ? (_: any, config: any) => {
        const renderConfig = omitUndefined({ ...config, onChange: undefined });
        return item?.renderFormItem?.(
          {
            type,
            ...item,
            formItemProps: item.getFormItemProps?.(),
            fieldProps: item.getFieldProps?.(),
            originProps: originItem,
          },
          {
            ...renderConfig,
            defaultRender,
            type,
          },
          formRef.current!,
        );
      }
    : undefined;

  if (item?.renderFormItem) {
    const dom = renderFormItem?.(null, {});
    if (!dom || item.ignoreFormItem) return dom;
  }

  return (
    <ProFormField
      {...formFieldProps}
      key={`${item.key}-${item.index}`}
      renderFormItem={renderFormItem}
    />
  );
};
