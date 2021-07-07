import React, { useContext, ReactNode } from 'react';
import { AuthContext } from '../../../provider/auth';

export interface Props {
  auth?: boolean;
  children?: ReactNode;
}

const IsAuthenticated: React.FC<Props> = ({
  auth = true,
  children,
}: Props): JSX.Element => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated === auth ? <>{children}</> : <></>;
};

export default IsAuthenticated;
