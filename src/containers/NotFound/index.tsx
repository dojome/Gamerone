import React from 'react';
import { Helmet } from 'react-helmet';
import { SITE_NAME } from 'utils/constants';

export interface Props {
  username: string;
}

const NotFound: React.FC<Props> = ({ username }: Props): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>
          {username} Not Found | {SITE_NAME}
        </title>
      </Helmet>
      <section className="wrapper section">
        <h1>{username} is not found</h1>
      </section>
    </>
  );
};

export default NotFound;
