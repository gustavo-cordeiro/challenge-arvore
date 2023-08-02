import React from "react";

export const useDebounce = <T,>(debounceFn: (args:T) => void, delay: number) => {
  const timer = React.useRef<ReturnType<typeof setTimeout>>();

  const debaouncedLoad = (args:T) => {
    if (timer) clearTimeout(timer.current);

    timer.current = setTimeout(() => {
      timer.current = undefined;
      debounceFn(args);
    }, delay);
  };

  return debaouncedLoad;
};