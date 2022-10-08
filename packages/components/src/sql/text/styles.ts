import React from "react";
import styled from "styled-components";

export const P: React.FC<any> = styled.p`
  text-overflow:ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
`

export const Context = styled.div`
  width: 528px;
  overflow: hidden;
`
