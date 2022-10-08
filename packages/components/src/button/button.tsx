import React from 'react';
import classNames from 'classnames';
import omit from 'rc-util/lib/omit';
import { ConfigContext } from '../config-provider';
import DisabledContext from '../config-provider/DisabledContext';
import SizeContext from '../config-provider/SizeContext';
import warning from '../_util/warning';
import Wave from '../_util/wave';
import Group, { GroupSizeContext } from './button-group';
import LoadingIcon from './LoadingIcon';
import {isTwoCNChar, isUnBorderedButtonType, spaceChildren} from './utils';
import { ButtonProps, CompoundedComponent, Loading, AnchorButtonProps, NativeButtonProps} from './interface';
import './style/index.less';

const InternalButton: React.ForwardRefRenderFunction<unknown, ButtonProps> = (props, ref) => {
  const {
    loading = false,
    prefixCls: customizePrefixCls,
    type = 'default',
    danger,
    shape = 'default',
    size: customizeSize,
    disabled: customDisabled,
    className,
    children,
    icon,
    ghost = false,
    block = false,
    /** If we extract items here, we don't need use omit.js */
    // React does not recognize the `htmlType` prop on a DOM element. Here we pick it out of `rest`.
    htmlType = 'button' as ButtonProps['htmlType'],
    ...rest
  } = props;

  const size = React.useContext(SizeContext);
  // ===================== Disabled =====================
  const disabled = React.useContext(DisabledContext);
  const mergedDisabled = customDisabled || disabled;

  const groupSize = React.useContext(GroupSizeContext);
  const [innerLoading, setLoading] = React.useState<Loading>(!!loading);
  const [hasTwoCNChar, setHasTwoCNChar] = React.useState(false);
  const { getPrefixCls, autoInsertSpaceInButton, direction } = React.useContext(ConfigContext);
  const buttonRef = (ref as any) || React.createRef<HTMLElement>();

  const isNeedInserted = () =>
    React.Children.count(children) === 1 && !icon && !isUnBorderedButtonType(type);

  const fixTwoCNChar = () => {
    // Fix for HOC usage like <FormatMessage />
    if (!buttonRef || !buttonRef.current || autoInsertSpaceInButton === false) {
      return;
    }
    const buttonText = buttonRef.current.textContent;
    if (isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!hasTwoCNChar) {
        setHasTwoCNChar(true);
      }
    } else if (hasTwoCNChar) {
      setHasTwoCNChar(false);
    }
  };

  // =============== Update Loading ===============
  const loadingOrDelay: Loading = typeof loading === 'boolean' ? loading : loading?.delay || true;

  React.useEffect(() => {
    let delayTimer: number | null = null;

    if (typeof loadingOrDelay === 'number') {
      delayTimer = window.setTimeout(() => {
        delayTimer = null;
        setLoading(loadingOrDelay);
      }, loadingOrDelay);
    } else {
      setLoading(loadingOrDelay);
    }

    return () => {
      if (delayTimer) {
        // in order to not perform a React state update on an unmounted component
        // and clear timer after 'loadingOrDelay' updated.
        window.clearTimeout(delayTimer);
        delayTimer = null;
      }
    };
  }, [loadingOrDelay]);

  React.useEffect(fixTwoCNChar, [buttonRef]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement, MouseEvent>) => {
    const { onClick } = props;
    // https://github.com/ant-design/ant-design/issues/30207
    if (innerLoading || mergedDisabled) {
      e.preventDefault();
      return;
    }
    (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)?.(e);
  };

  warning(
    !(typeof icon === 'string' && icon.length > 2),
    'Button',
    `\`icon\` is using ReactNode instead of string naming in v4. Please check \`${icon}\` at https://ant.design/components/icon`,
  );

  warning(
    !(ghost && isUnBorderedButtonType(type)),
    'Button',
    "`link` or `text` button can't be a `ghost` button.",
  );

  const prefixCls = getPrefixCls('btn', customizePrefixCls);
  const autoInsertSpace = autoInsertSpaceInButton !== false;

  const sizeClassNameMap = { large: 'lg', small: 'sm', middle: undefined };
  const sizeFullname = groupSize || customizeSize || size;
  const sizeCls = sizeFullname ? sizeClassNameMap[sizeFullname] || '' : '';

  const iconType = innerLoading ? 'loading' : icon;

  const linkButtonRestProps = omit(rest as AnchorButtonProps & { navigate: any }, ['navigate']);

  const classes = classNames(
    prefixCls,
    {
      [`${prefixCls}-${shape}`]: shape !== 'default' && shape, // Note: Shape also has `default`
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-icon-only`]: !children && children !== 0 && !!iconType,
      [`${prefixCls}-background-ghost`]: ghost && !isUnBorderedButtonType(type),
      [`${prefixCls}-loading`]: innerLoading,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar && autoInsertSpace && !innerLoading,
      [`${prefixCls}-block`]: block,
      [`${prefixCls}-dangerous`]: !!danger,
      [`${prefixCls}-rtl`]: direction === 'rtl',
      [`${prefixCls}-disabled`]: linkButtonRestProps.href !== undefined && mergedDisabled,
    },
    className,
  );

  const iconNode =
    icon && !innerLoading ? (
      icon
    ) : (
      <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
    );

  const kids =
    children || children === 0
      ? spaceChildren(children, isNeedInserted() && autoInsertSpace)
      : null;

  if (linkButtonRestProps.href !== undefined) {
    return (
      <a {...linkButtonRestProps} className={classes} onClick={handleClick} ref={buttonRef}>
        {iconNode}
        {kids}
      </a>
    );
  }

  const buttonNode = (
    <button
      {...(rest as NativeButtonProps)}
      type={htmlType}
      className={classes}
      onClick={handleClick}
      disabled={mergedDisabled}
      ref={buttonRef}
    >
      {iconNode}
      {kids}
    </button>
  );

  if (isUnBorderedButtonType(type)) {
    return buttonNode;
  }

  return <Wave disabled={!!innerLoading}>{buttonNode}</Wave>;
};

/**
 * @visibleName Button
*/
const Button = React.forwardRef<unknown, ButtonProps>(InternalButton) as CompoundedComponent;
if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

Button.Group = Group;
Button.__ANT_BUTTON = true;

export default Button;
