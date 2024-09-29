/* eslint-disable @typescript-eslint/no-explicit-any */

type TimeoutHandle = ReturnType<typeof setTimeout>;

type DebouncedFunction<T extends (...args: any[]) => any> = T & {
  cancel: () => void;
};

const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  timeout: {
    current?: TimeoutHandle;
  },
): DebouncedFunction<T> => {
  const debounced = function (this: any, ...args: Parameters<T>): void {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };

  debounced.cancel = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
  };

  return debounced as DebouncedFunction<T>;
};

export default debounce;
