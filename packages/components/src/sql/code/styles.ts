import styled from 'styled-components';
import { Copy } from '@/copy';

export const Pre = styled(Copy)`
  position: relative;
  > div {
    display: block;
    max-height: ${({height}: any) => height + 'px'};
  }
  pre {
    z-index: 1;
    overflow-x: hidden;
    padding: 10px;
    code {
      overflow-x: hidden;
    }
  }
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    z-index: 2;
    color: #595959;
  }
`;
