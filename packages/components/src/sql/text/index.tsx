import React from 'react';
import Popover from '@/popover';
import { Code } from '../code';
import { IText } from './interface';
import { P, Context } from './styles';

export const Text: React.FC<IText> = ({ children, title, subTitle }) => {
  const value = (children as string) || '';
  const sqlContent = (
    <Context>
      <h4>{title}</h4>
      {subTitle}
      <Code height={200} hasCopy={true}>
        {value}
      </Code>
    </Context>
  );
  return (
    <Popover title={null} content={sqlContent} placement="bottomLeft">
      <P>{value}</P>
    </Popover>
  );
};
