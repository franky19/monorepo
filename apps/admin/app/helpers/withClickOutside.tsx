import React, {
  useState,
  useRef,
  useEffect,
  ForwardRefExoticComponent,
} from 'react';

const withClickOutside = <T,>(
  WrappedComponent: ForwardRefExoticComponent<T>,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Component = (props: T) => {
    const [visible, setVisible] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (!ref.current?.contains(event.target as Node)) {
          setVisible(false);
        }
      };

      const handleKeydown = (e: KeyboardEvent) => {
        if (e.key?.toLowerCase() === 'escape') {
          setVisible(false);
        }
      };

      // console.log("INITIALIZING LISTENERS");
      document.addEventListener('click', handleClickOutside);
      document.addEventListener('keydown', handleKeydown);

      return () => {
        document.removeEventListener('click', handleClickOutside);
        document.removeEventListener('keydown', handleKeydown);
      };
    }, []);

    return (
      <WrappedComponent
        ref={ref}
        {...props}
        visible={visible}
        setVisible={setVisible}
      />
    );
  };

  return Component;
};

export default withClickOutside;
