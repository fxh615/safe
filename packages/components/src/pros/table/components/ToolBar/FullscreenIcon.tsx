import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { useIntl } from '@/pros/provider';
import { isBrowser } from '@/pros/utils';
import Tooltip from '@/tooltip';
import React, { useEffect, useState } from 'react';

const FullScreenIcon = () => {
  const intl = useIntl();
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useEffect(() => {
    if (!isBrowser()) {
      return;
    }
    document.onfullscreenchange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
  }, []);
  return fullscreen ? (
    <Tooltip title={intl.getMessage('tableToolBar.exitFullScreen', '全屏')}>
      <FullscreenExitOutlined />
    </Tooltip>
  ) : (
    <Tooltip title={intl.getMessage('tableToolBar.fullScreen', '全屏')}>
      <FullscreenOutlined />
    </Tooltip>
  );
};

export default React.memo(FullScreenIcon);
