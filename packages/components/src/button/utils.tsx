import React from 'react';
import {rxTwoCNChar} from './constant';
import { cloneElement } from '../_util/reactNode';
import {ButtonType, LegacyButtonType, ButtonProps} from './interface';

export const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);

export function isString(str: any) {
  return typeof str === 'string';
}

export function isUnBorderedButtonType(type: ButtonType | undefined) {
  return type === 'text' || type === 'link';
}

export function isReactFragment(node: React.ReactNode) {
  return React.isValidElement(node) && node.type === React.Fragment;
}

// Insert one space between two chinese characters automatically.
export function insertSpace(child: React.ReactChild, needInserted: boolean) {
  // Check the child if is undefined or null.
  if (child === null || child === undefined) {
    return;
  }
  const SPACE = needInserted ? ' ' : '';
  // strictNullChecks oops.
  if (
    typeof child !== 'string' &&
    typeof child !== 'number' &&
    isString(child.type) &&
    isTwoCNChar(child.props.children)
  ) {
    return cloneElement(child, {
      children: child.props.children.split('').join(SPACE),
    });
  }
  if (typeof child === 'string') {
    return isTwoCNChar(child) ? <span>{child.split('').join(SPACE)}</span> : <span>{child}</span>;
  }
  if (isReactFragment(child)) {
    return <span>{child}</span>;
  }
  return child;
}

export function spaceChildren(children: React.ReactNode, needInserted: boolean) {
  let isPrevChildPure: boolean = false;
  const childList: React.ReactNode[] = [];
  React.Children.forEach(children, child => {
    const type = typeof child;
    const isCurrentChildPure = type === 'string' || type === 'number';
    if (isPrevChildPure && isCurrentChildPure) {
      const lastIndex = childList.length - 1;
      const lastChild = childList[lastIndex];
      childList[lastIndex] = `${lastChild}${child}`;
    } else {
      childList.push(child);
    }

    isPrevChildPure = isCurrentChildPure;
  });

  // Pass to React.Children.map to auto fill key
  return React.Children.map(childList, child =>
    insertSpace(child as React.ReactChild, needInserted),
  );
}

/**
 * @visibleName Button
*/
export function convertLegacyProps(type?: LegacyButtonType): ButtonProps {
  if (type === 'danger') {
    return { danger: true };
  }
  return { type };
}
