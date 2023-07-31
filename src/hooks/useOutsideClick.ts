import React, { useEffect, useRef, useState } from 'react';

export const useOutsideClick = (
  initialIsVisible: boolean,
): {
  ref: React.MutableRefObject<HTMLDivElement | null>;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
} => {
  const [isShow, setIsShow] = useState(initialIsVisible);
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent): void => {
    if (event.target instanceof Node && !ref.current?.contains(event.target)) {
      setIsShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

  return { ref, isShow, setIsShow };
};
