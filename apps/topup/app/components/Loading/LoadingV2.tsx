import {twMerge} from 'tailwind-merge';

const LoadingV2 = ({className}: {className?: string}) => {
  return (
    <div
      className={twMerge(
        'inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-white border-r-transparent',
        className,
      )}
    />
  );
};

export default LoadingV2;
