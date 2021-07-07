import React from 'react';
import Loader from '../Loader';
import './style.scss';

const LoaderFullScreen: React.FC = (): JSX.Element => {
  return (
    <div className="loader-wrapper">
      <Loader />
    </div>
  );
};

export default LoaderFullScreen;
