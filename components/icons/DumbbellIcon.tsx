
import React from 'react';

export const DumbbellIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
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
    <path d="M14.4 14.4 9.6 9.6" />
    <path d="M18.657 5.343a2 2 0 1 0-2.829-2.828" />
    <path d="M10.828 13.172a2 2 0 1 0-2.828 2.829" />
    <path d="m12 12 2.828-2.828" />
    <path d="M9.172 10.828 6.343 8a2 2 0 1 0-2.828 2.829L8 16.343" />
    <path d="m16 8-1.93-1.93" />
    <path d="M5.343 18.657a2 2 0 1 0 2.829 2.828" />
    <path d="M13.172 9.172a2 2 0 1 0 2.829-2.828" />
  </svg>
);
