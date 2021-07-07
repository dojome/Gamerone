import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const Legal: React.FC = (): JSX.Element => {
  return (
    <div className="legal-wrapper">
      <div>
        <Link to="/privacy">Privacy</Link>
        <span>&#xb7;</span>
        <Link to="/terms">Terms</Link>
        {/* <span>&#xb7;</span> */}
        {/* <Link to="/terms#cookies">Cookies</Link> */}
      </div>
      <div>Gamer One Entertainment Inc &copy; 2020</div>
    </div>
  );
};

export default Legal;
