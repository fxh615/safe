import StarFilled from '@ant-design/icons/StarFilled';
import RcRate from 'rc-rate';
import type { RateProps as RcRateProps } from 'rc-rate/lib/Rate';
import * as React from 'react';
import { ConfigContext } from '../config-provider';
import Tooltip from '../tooltip';
import './style/index.less';

export interface RateProps extends RcRateProps {
  tooltips?: Array<string>;
}

interface RateNodeProps {
  index: number;
}

const Rate = React.forwardRef<unknown, RateProps>(({ prefixCls, tooltips, ...props }, ref) => {
  const characterRender = (node: React.ReactElement, { index }: RateNodeProps) => {
    if (!tooltips) return node;
    return <Tooltip title={tooltips[index]}>{node}</Tooltip>;
  };

  const { getPrefixCls, direction } = React.useContext(ConfigContext);
  const ratePrefixCls = getPrefixCls('rate', prefixCls);

  return (
    <RcRate
      ref={ref as any}
      characterRender={characterRender as any}
      {...props}
      prefixCls={ratePrefixCls}
      direction={direction}
    />
  );
});

if (process.env.NODE_ENV !== 'production') {
  Rate.displayName = 'Rate';
}

Rate.defaultProps = {
  character: <StarFilled />,
};

export default Rate;
