import * as React from 'react';
import type { SVGProps } from 'react';
const SvgFlag = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 29 33"
    {...props}
  >
    <path
      fill="#000"
      stroke="#000"
      strokeWidth={3}
      d="M2 1.5h25a.5.5 0 0 1 .5.5v28.065a.5.5 0 0 1-.795.404l-10.483-7.65a3.5 3.5 0 0 0-4.195.052L2.305 30.34a.5.5 0 0 1-.805-.397V2a.5.5 0 0 1 .5-.5Z"
    />
  </svg>
);
export default SvgFlag;
