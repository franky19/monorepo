import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Icons from './Icons';
import Links from '../Links';
import Lottie from 'lottie-react';
import './style.scss';

export interface ButtonsProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  label?: string;
  types?: string;
  sizes?: string;
  minWidth?: string;
  maxWidth?: string;
  leftIcon?: string;
  leftIconStyle?: React.CSSProperties;
  rightIcon?: string;
  rightIconStyle?: React.CSSProperties;
  stretch?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  isRounded?: boolean;
  styles?: React.CSSProperties;
  href?: string;
  as?: string;
  target?: string;
  capsuled?: boolean;
  circle?: boolean;
}

type StyledButtonProps = {
  $minWidth: string;
  $maxWidth: string;
};
const Button = styled.button<StyledButtonProps>`
  min-width: ${props => props.$minWidth};
  max-width: ${props => props.$maxWidth};
`;

const Buttons = ({
  label = '',
  types = 'primary',
  sizes = 'md',
  minWidth = '40px',
  maxWidth = 'auto',
  leftIcon,
  leftIconStyle,
  rightIcon,
  rightIconStyle,
  stretch = false,
  disabled = false,
  isLoading = false,
  isRounded = true,
  styles,
  className = '',
  href,
  as,
  target = '_self',
  capsuled = false,
  circle = false,
  onClick,
  ...otherProps
}: ButtonsProps) => {
  const isStretch = stretch ? 'stretch' : '';
  const isDisabled = disabled ? '-disabled' : '';
  const BtnRounded = isRounded ? 'rounded' : '';
  const BtnCapsuled = capsuled ? 'capsuled' : '';
  const BtnCircle = circle ? 'circle' : '';
  const btnClasses =
    `btn  btn--${types}${isDisabled} btn--${sizes} ${className} ${isStretch} ${BtnCapsuled} ${BtnRounded} ${BtnCircle}`.trim();
  const onClickHandler = disabled || href ? {} : {onClick: onClick};
  const getLoaderAsset = () => {
    if (types === 'primary') {
      return require('../../../../../packages/smartfren-ui/assets/lottie/loading_white_animation.json');
    }
    return require('../../../../../packages/smartfren-ui/assets/lottie/loading_red_animation.json');
  };
  const BtnLeftIcon = leftIcon ? (
    <Icons icons={leftIcon} className={'icon--left'} styles={leftIconStyle} />
  ) : (
    ''
  );
  const BtnRightIcon =
    rightIcon && !circle ? (
      <Icons
        icons={rightIcon}
        className={'icon--right'}
        styles={rightIconStyle}
      />
    ) : (
      ''
    );
  const BtnLabel =
    label && !circle ? (
      <p className="font-medium text-sm tracking-tighter leading-6 label-button">
        {label}
      </p>
    ) : (
      ''
    );
  const BtnContentLoaders = isLoading ? (
    <Lottie
      className={'btn--loader'}
      animationData={getLoaderAsset()}
      autoplay={true}
      loop={true}
    />
  ) : (
    //styleName: Components/Button Small;
    // font-family: Roboto;
    // font-size: 13px;
    // font-weight: 500;
    // line-height: 22px;
    // letter-spacing: 0.46000000834465027px;
    // text-align: left;

    <>
      {BtnLeftIcon}
      {BtnLabel}
      {BtnRightIcon}
    </>
  );
  const BtnComponents = (
    <Button
      type={'button'}
      className={btnClasses}
      $minWidth={minWidth}
      $maxWidth={maxWidth}
      {...onClickHandler}
      {...otherProps}
      style={styles}>
      {BtnContentLoaders}
    </Button>
  );
  const BtnLinks = (
    <Links
      className={btnClasses}
      title={label}
      href={href}
      as={as}
      target={target}
      styles={{
        minWidth: minWidth,
        maxWidth: maxWidth,
      }}
      {...otherProps}>
      {BtnContentLoaders}
    </Links>
  );

  return href && !disabled ? BtnLinks : BtnComponents;
};

Buttons.propTypes = {
  types: PropTypes.oneOf([
    'primary',
    'secondary',
    'tertiery',
    'ghost_black',
    'ghost_color',
  ]),
  sizes: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
};

export default Buttons;
