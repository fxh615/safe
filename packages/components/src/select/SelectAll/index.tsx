import React, {useState} from 'react';
import Checkbox from '@/checkbox/Checkbox';
import Select from '../Select';
import type{ISelectAll} from './interfaces';
import {Span, P, Text} from './styles'



export const SelectAll: React.FC<ISelectAll> = ({options, value = [], dropdownMatchSelectWidth= true, onChange, labelRender, ...props}) => {
  const [selected, setSelected] = useState<string[]>(value);
  const triggerAll = (isAll: boolean) => {
    if(isAll) {
      const res = options.map((item: any) => item.value);
      setSelected(res);
      onChange?.([]);
    } else {
      setSelected([]);
      onChange?.([]);
    }
  }

  const onSelect = (v: string) => {
    if(v) {
      const checked = selected.includes(v);
      let list = [...selected];
      if(checked) {
        list = selected.filter((item: string) => item !== v);
      } else {
        list.push(v);
      }
      setSelected([...list])
      onChange?.([...list])

    } else {
      const isAll = selected.length === options.length;
      triggerAll(!isAll);
    }

  }

  const onDeselect = (v: string) => {
    if(v) {
      const checked = selected.includes(v);
      let list = [...selected];
      if(checked) {
        list = selected.filter((item: string) => item !== v);
      } else {
        list.push(v);
      }
      setSelected([...list])
      onChange?.([...list])

    } else {
      const isAll = selected.length === options.length;
      triggerAll(!isAll);
    }

  }

  return (
    <Select
      placeholder="请选择"
      optionLabelProp="label"
      onSelect={onSelect}
      onDeselect={onDeselect}
      value={selected}
      mode="checkbox"
      showArrow={true}
      dropdownMatchSelectWidth={dropdownMatchSelectWidth}
      {...props}
    >
      <Select.Option label="全选" value=''>
        <Checkbox checked={selected.length === options.length} />
        <Span>全选</Span>
      </Select.Option>
      {
        options.map((option: any) => (
          <Select.Option
            value={option.value}
            label={option.label}
            key={option.value}
          >
            <P>
              <Checkbox checked={selected?.includes(option.value)} />
              <Text>
                <Span ellipsis={{tooltip: option.value}}>
                  {
                    labelRender ? labelRender(option) : option.label
                  }
                </Span>
              </Text>
            </P>
          </Select.Option>
        ))
      }

    </Select>
  )
}
