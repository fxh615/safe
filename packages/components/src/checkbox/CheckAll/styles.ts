import styled from 'styled-components';
import {Item} from './item';


export const DD = styled.dd`
  padding-left: 24px;
  label{
    margin-top: 10px;
  }
`

export const ItemWrap = styled(Item)`
  ${({isInline}: any) => isInline ? `
    display: inline-block;
    margin-right: 8px;
  ` : ''}
`
