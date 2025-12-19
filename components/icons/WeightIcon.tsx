
import React from 'react';

export const WeightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2v4" />
    <path d="M12 20v2" />
    <path d="m19 9-4.9-2.9" />
    <path d="m5 9 4.9-2.9" />
  </svg>
);
