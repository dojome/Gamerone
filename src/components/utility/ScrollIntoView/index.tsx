import { useEffect, useRef, ReactNode } from 'react';
import { withRouter } from 'react-router-dom';

export interface ScrollIntoViewProps {
  location: any;
  children?: ReactNode;
}

const ScrollIntoView: React.FC<ScrollIntoViewProps> = ({
  location,
  children,
}: ScrollIntoViewProps): JSX.Element => {
  const prevLocation = useRef();

  useEffect(() => {
    if (prevLocation.current !== location.pathname) {
      window.scrollTo(0, 0);
      prevLocation.current = location.pathname;
    }
  }, [location]);

  return (children as unknown) as JSX.Element;
};

export default withRouter(ScrollIntoView);
