import { useEffect, useState } from 'react';
import Checkbox from '../Checkbox';
import Group from '../Group';
import { DD } from './styles';

export const Item = ({ dataSource, value, onChange, className }: any) => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleAll = (e: any) => {
    const checked = e.target.checked;
    if (checked) {
      const res = dataSource.children
        ? dataSource.children.map((item: any) => item.value)
        : [dataSource.value];
      onChange({
        [dataSource.value]: res,
      });
      setSelected(res);
    } else {
      onChange({
        [dataSource.value]: [],
      });
      setSelected([]);
    }
  };

  const toggleChecked = (v: any) => {
    setSelected(v);
    onChange({
      [dataSource.value]: v,
    });
  };

  useEffect(() => {
    if (value) {
      setSelected(value);
    } else {
      setSelected([]);
    }
  }, [value]);

  return (
    <dl className={className}>
      <dt>
        <Checkbox
          value={dataSource.value}
          checked={
            dataSource.children
              ? dataSource.children.length === selected?.length
              : selected?.length > 0
          }
          onChange={toggleAll}
        >
          {dataSource.label}
        </Checkbox>
      </dt>
      {dataSource.children && dataSource.children.length ? (
        <DD>
          <Group
            options={dataSource.children as any}
            value={selected}
            onChange={toggleChecked}
          />
        </DD>
      ) : null}
    </dl>
  );
};
