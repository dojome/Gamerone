import { ReactNode } from 'react';
import Proptypes from 'prop-types';

export interface Props {
  condition?: boolean;
  children?: ReactNode;
  fallback: any;
}

function If(props: Props) {
  return props.condition ? props.children : props.fallback;
}

If.propsTypes = {
  condition: Proptypes.bool,
  fallback: Proptypes.oneOfType([
    Proptypes.arrayOf(Proptypes.node),
    Proptypes.node,
  ]),
  children: Proptypes.oneOfType([
    Proptypes.arrayOf(Proptypes.node),
    Proptypes.node,
  ]),
};

If.defaultProps = {
  fallback: null,
};

export default If;
