import { useState, useEffect } from 'react';

interface DelayAmount {
  open: number;
  close: number;
}
export default function useSmoothOpen(
  show: boolean,
  mount = true,
  delay: DelayAmount = { open: 100, close: 200 },
) {
  const [isOpen, setIsOpen] = useState(false);
  const [render, setRender] = useState(false);

  // When opening, mount to the DOM first, and then open it after certain delay
  // When closing, close it for a certain period first, and then unmount from the DOM.

  useEffect(() => {
    if (mount === false) {
      setRender(show);
      setIsOpen(show);
    } else if (show) {
      setRender(true);
      setTimeout(() => {
        setIsOpen(true);
      }, delay.open);
    } else if (!show) {
      setIsOpen(false);
      setTimeout(() => {
        setRender(false);
      }, delay.close);
    }
  }, [show, delay, mount]);

  return [isOpen, render] as const;
}
