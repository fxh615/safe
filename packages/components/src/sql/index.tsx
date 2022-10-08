import React from 'react';
import {Code} from './code';
import type {ICode} from './code/interface';
import {Text} from './text';
import type {IText} from './text/interface';

export class SQL extends React.Component {
  static Code(props: ICode) {
    return <Code {...props} />;
  }

  static Text(props: IText) {
    return <Text {...props} />;
  }

  render() {
    return <>{this.props.children}</>;
  }
}
