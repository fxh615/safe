import React, { useEffect, useState } from 'react';
import { map, pipe, mergeAll, is } from 'ramda';
import Checkbox from '../Checkbox';
import { ItemWrap } from './styles';
import type { ICheckAll, ICheckItem } from './interfaces';

export const CheckAll: React.FC<ICheckAll> = ({
  dataSource,
  defaultValue = [],
  layout,
  onChange,
}) => {
  const [value, setValue] = useState<any>(null);

  const checkAll = (e: any) => {
    const checked = e.target.checked;
    if (checked) {
      const res = pipe(
        map((item: any) => ({
          [item.value]: item.children ? item.children.map((item: any) => item.value) : [item.value],
        })),
        mergeAll,
      )(dataSource);
      setValue(res);
    } else {
      setValue({});
    }
  };

  const changeItem = (v: any) => {
    setValue((data: any) => ({
      ...data,
      ...v,
    }));
  };

  const init = () => {
    const res = pipe(
      map((item: any) => {
        if (is(String, item)) {
          return {
            [item]: [item],
          };
        } else {
          return {
            [item[0]]: item[1] || [item[0]],
          };
        }
      }),
      mergeAll,
    )(defaultValue);
    console.log('checkall', res, defaultValue);
    setValue(res);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <div>
      <dl>
        <dt>
          <Checkbox
            checked={value ? Object.keys(value).length === dataSource.length : false}
            onChange={checkAll}
          >
            全选
          </Checkbox>
        </dt>
      </dl>
      {value
        ? dataSource.map((group: ICheckItem) => {
            return (
              <ItemWrap
                isInline={layout === 'inline'}
                key={group.value}
                dataSource={group}
                value={value[group.value]}
                onChange={changeItem}
              />
            );
          })
        : null}
    </div>
  );
};
