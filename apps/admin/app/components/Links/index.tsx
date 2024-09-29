import React, {ReactNode, ReactElement} from 'react';
import Link, {LinkProps} from 'next/link';

export interface LinksProps extends LinkProps {
  rel?: string;
  title?: string;
  target?: string;
  className?: string;
  styles?: React.CSSProperties;
  children?: ReactNode | ReactElement | ReactElement[] | undefined;
}

const Links = (props: LinksProps) => <Link {...props} />;

export default Links;
