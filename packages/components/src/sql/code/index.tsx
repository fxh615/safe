import { useEffect, useRef } from 'react';
import { format } from 'sql-formatter';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
import {ICode} from './interface';
import { Pre } from './styles';
import './index.css';

export const Code: React.FC<ICode> = ({height, hasCopy, children}) => {
  const ref: any = useRef(null);

  const renderSql = (sql: string) => {
    let result = '';
    try {
      result = format(sql);
    } catch (err) {
      result = sql;
    }
    return result;
  };

  useEffect(() => {
    try {
      hljs.highlightAll();
    } catch (e) {
      console.log(e);
    }
  }, [children]);

  return (
    <Pre height={height} hasCopy={hasCopy}>
      {children && (
        <pre className="language-sql" ref={ref}>
          <code style={{ maxHeight: height }}>{renderSql(children)}</code>
        </pre>
      )}
    </Pre>
  );
};
