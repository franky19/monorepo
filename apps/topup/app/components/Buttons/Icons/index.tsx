import React from 'react';
import styled from 'styled-components';
import './style.scss';
import './mysf_icons-codes.css';

export type IconsProps = {
  icons?: string;
  sizes?: string;
  colors?: string;
  className?: string;
  styles?: React.CSSProperties;
};

type StyledIconProps = {
  $iconSize: string;
  $iconColor: string;
};
const Icon = styled.i<StyledIconProps>`
  font-size: ${props => props.$iconSize};
  line-height: ${props => props.$iconSize};
  width: ${props => props.$iconSize};
  height: ${props => props.$iconSize};
  color: ${props => props.$iconColor};
  &::before {
    width: ${props => props.$iconSize};
    height: ${props => props.$iconSize};
  }
`;

const Icons = ({
  icons,
  sizes = '',
  colors = '',
  className = '',
  styles,
  ...otherProps
}: IconsProps) => {
  const resizedStyle = sizes && sizes.length ? `${sizes} !important` : '';
  const coloredStyle = colors && colors.length ? `${colors} !important` : '';
  return (
    <Icon
      className={`icon icon-${icons} ${className}`.trim()}
      style={styles}
      $iconSize={resizedStyle}
      $iconColor={coloredStyle}
      {...otherProps}
    />
  );
};

export default Icons;
