import React from 'react';
import NextImage, {ImageProps as NextImageProps} from 'next/image';

type ImageAssetProps = Omit<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
  'height' | 'width' | 'loading' | 'ref' | 'alt' | 'src' | 'srcSet'
> & {
  src: string | NextImageProps['src'];
  alt?: string;
  width?: number | `${number}`;
  height?: number | `${number}`;
  fill?: boolean;
  loader?: NextImageProps['loader'];
  quality?: number | `${number}`;
  priority?: boolean;
  loading?: 'eager' | 'lazy';
  placeholder?: NextImageProps['placeholder'];
  blurDataURL?: string;
  unoptimized?: boolean;
  onLoadingComplete?: NextImageProps['onLoadingComplete'];
  layout?: string;
  objectFit?: string;
  objectPosition?: string;
  lazyBoundary?: string;
  lazyRoot?: string;
  className?: string;
  onClick?: () => void;
} & React.RefAttributes<HTMLImageElement>;

export const ImageAsset = React.forwardRef<HTMLImageElement, ImageAssetProps>(
  (
    {
      src,
      alt,
      width,
      height,
      fill,
      loader,
      quality,
      priority,
      loading,
      placeholder,
      blurDataURL,
      unoptimized,
      onLoadingComplete,
      layout,
      objectFit,
      objectPosition,
      lazyBoundary,
      lazyRoot,
      className,
      onClick,
      ...props
    },
    ref,
  ) => {
    return (
      <NextImage
        src={`${process?.env?.['BASE_PATH'] ?? ''}/assets/${src}`}
        alt={alt || 'image'}
        width={width}
        height={height}
        fill={fill}
        loader={loader}
        quality={quality}
        priority={priority}
        loading={loading}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        unoptimized={unoptimized}
        onLoadingComplete={onLoadingComplete}
        layout={layout}
        objectFit={objectFit}
        objectPosition={objectPosition}
        lazyBoundary={lazyBoundary}
        lazyRoot={lazyRoot}
        className={className}
        onClick={onClick}
        ref={ref}
        {...props}
      />
    );
  },
);

ImageAsset.displayName = 'ImageAsset';
