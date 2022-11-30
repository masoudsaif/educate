import { ForwardedRef, MutableRefObject, useEffect, useRef } from 'react';

const useForwardedRef = <T>(ref: ForwardedRef<T> | Function) => {
  const innerRef = useRef() as MutableRefObject<T>;

  useEffect(() => {
    if (!ref) {
      return;
    } else if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  }, [ref]);

  return innerRef;
};

export default useForwardedRef;
