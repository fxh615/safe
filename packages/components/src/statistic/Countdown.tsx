import * as React from 'react';
import { cloneElement } from '../_util/reactNode';
import type { StatisticProps } from './Statistic';
import Statistic from './Statistic';
import type { countdownValueType, FormatConfig } from './utils';
import { formatCountdown } from './utils';

const REFRESH_INTERVAL = 1000 / 30;

interface CountdownProps extends StatisticProps {
  value?: countdownValueType;
  format?: string;
  onFinish?: () => void;
  onChange?: (value?: countdownValueType) => void;
}

function getTime(value?: countdownValueType) {
  return new Date(value as any).getTime();
}

class Countdown extends React.Component<CountdownProps, {}> {
  static defaultProps: Partial<CountdownProps> = {
    format: 'HH:mm:ss',
  };

  countdownId?: number;

  componentDidMount() {
    this.syncTimer();
  }

  componentDidUpdate() {
    this.syncTimer();
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  syncTimer = () => {
    const { value } = this.props;

    const timestamp = getTime(value);
    if (timestamp >= Date.now()) {
      this.startTimer();
    } else {
      this.stopTimer();
    }
  };

  startTimer = () => {
    if (this.countdownId) return;

    const { onChange, value } = this.props;
    const timestamp = getTime(value);

    this.countdownId = window.setInterval(() => {
      this.forceUpdate();

      if (onChange && timestamp > Date.now()) {
        onChange(timestamp - Date.now());
      }
    }, REFRESH_INTERVAL);
  };

  stopTimer = () => {
    const { onFinish, value } = this.props;
    if (this.countdownId) {
      clearInterval(this.countdownId);
      this.countdownId = undefined;

      const timestamp = getTime(value);
      if (onFinish && timestamp < Date.now()) {
        onFinish();
      }
    }
  };

  formatCountdown = (value: countdownValueType, config: FormatConfig) => {
    const { format } = this.props;
    return formatCountdown(value, { ...config, format });
  };

  // Countdown do not need display the timestamp
  // eslint-disable-next-line class-methods-use-this
  valueRender = (node: React.ReactElement<HTMLDivElement>) =>
    cloneElement(node, {
      title: undefined,
    });

  render() {
    return (
      <Statistic valueRender={this.valueRender as any} {...this.props} formatter={this.formatCountdown as any} />
    );
  }
}

export default Countdown;
