import { useRef } from 'react';
import message from '@/message';
import { CopyOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import { is } from 'ramda';
import {ICopy} from './interface';
import { CopyStyle } from './styles';

export const Copy: React.FC<ICopy> = ({ children, className, hasCopy }) => {
  const ref = useRef<any>(null);
  const doCopy = () => {
    let code = '';
    if (is(String, children) || is(Number, children)) {
      code = String(children);
    } else if (ref.current) {
      code = ref.current?.innerHTML.replace(/<.*?>/g, '');
    }
    try {
      const res = copy(code);
      if (res) {
        message.success('已经复制到剪切板了!');
      }
    } catch (err) {
      message.error('复制失败～');
      console.log(err);
    }
  };

  return (
    <CopyStyle onClick={hasCopy ? doCopy : () => {}} className={className}>
      <div ref={ref}>{children}</div>
      {
        hasCopy ? (<CopyOutlined className="icon" />) : null
      }
    </CopyStyle>
  );
};
