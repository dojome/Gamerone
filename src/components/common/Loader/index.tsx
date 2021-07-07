import React from 'react';
import './style.scss';

export interface LoaderProps {
  show?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  show = true,
}: LoaderProps): JSX.Element => {
  return show ? (
    <svg
      id="loader"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 272 272"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      fill="currentColor"
    >
      <g id="ej12rbhddq82_to" transform="translate(136,154.181000)">
        <g id="ej12rbhddq82_tr" transform="rotate(0)">
          <g id="ej12rbhddq82" transform="translate(-136,-154.181000)">
            <g id="ej12rbhddq83_to" transform="translate(36,36.362000)">
              <g id="ej12rbhddq83_ts" transform="scale(1,1)">
                <path
                  id="ej12rbhddq83"
                  d="M145.091000,117.820000C145.091000,132.882000,132.881000,145.092000,117.819000,145.092000C102.756000,145.092000,90.545900,132.882000,90.545900,117.820000C90.545900,102.757000,102.756000,90.546900,117.819000,90.546900C132.881000,90.546900,145.091000,102.757000,145.091000,117.820000Z"
                  transform="translate(0,0)"
                  stroke="none"
                  strokeWidth="1"
                />
              </g>
            </g>
            <g id="ej12rbhddq84">
              <path
                id="ej12rbhddq85"
                d="M40.969700,0C18.342800,0,0,18.342800,0,40.969700L0,134.182000C0,138.198000,3.256110,141.455000,7.272730,141.455000L40,141.455000C44.016600,141.455000,47.272700,138.198000,47.272700,134.182000L47.272700,6.303030C47.272700,2.821960,44.450800,0,40.969700,0Z"
                transform="matrix(1 0 0 1 35.99999999999999 36.36200000000008)"
                stroke="none"
                strokeWidth="1"
              />
              <path
                id="ej12rbhddq86"
                d="M40.969700,0C18.342800,0,0,18.342800,0,40.969700L0,134.182000C0,138.198000,3.256110,141.455000,7.272730,141.455000L40,141.455000C44.016600,141.455000,47.272700,138.198000,47.272700,134.182000L47.272700,6.303030C47.272700,2.821960,44.450800,0,40.969700,0Z"
                transform="matrix(0 1 -1 0 235.99999999999997 36.36200000000008)"
                stroke="none"
                strokeWidth="1"
              />
              <g id="ej12rbhddq87_to" transform="translate(36,36.362000)">
                <path
                  id="ej12rbhddq87"
                  d="M0,159.393000C0,182.020000,18.342800,200.363000,40.969700,200.363000L134.182000,200.363000C138.198000,200.363000,141.455000,197.106000,141.455000,193.090000L141.455000,160.363000C141.455000,156.346000,138.198000,153.090000,134.182000,153.090000L6.303030,153.090000C2.821960,153.090000,0,155.912000,0,159.393000Z"
                  transform="translate(0,0)"
                  stroke="none"
                  strokeWidth="1"
                />
              </g>
              <g id="ej12rbhddq88_to" transform="translate(36,36.362000)">
                <path
                  id="ej12rbhddq88"
                  d="M200,194.668000C200,217.295000,181.658000,235.638000,159.031000,235.638000C155.550000,235.638000,152.728000,232.816000,152.728000,229.335000L152.728000,101.456000C152.728000,97.439700,155.984000,94.183600,160,94.183600L192.728000,94.183600C196.744000,94.183600,200,97.439700,200,101.456000L200,194.668000Z"
                  transform="translate(0,0)"
                  stroke="none"
                  strokeWidth="1"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  ) : (
    <></>
  );
};

export default Loader;
