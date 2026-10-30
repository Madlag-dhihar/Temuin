import React from 'react';

/** A decorative echo of the two intersecting circles in the supplied brand. */
export const ConnectionMark: React.FC<{className?: string}> = ({className=''}) => (
  <svg className={className} viewBox="0 0 320 250" fill="none" aria-hidden="true" focusable="false">
    <path d="M18 125h284M160 15v220" stroke="currentColor" strokeOpacity=".14" strokeDasharray="3 7"/>
    <circle cx="160" cy="125" r="106" stroke="currentColor" strokeOpacity=".1"/>
    <circle cx="119" cy="125" r="70" stroke="currentColor" strokeWidth="2"/>
    <circle cx="201" cy="125" r="70" stroke="currentColor" strokeWidth="2"/>
    <path d="M160 68a70 70 0 0 1 0 114 70 70 0 0 1 0-114Z" fill="currentColor" fillOpacity=".7"/>
    <circle cx="49" cy="125" r="5" fill="currentColor"/>
    <circle cx="271" cy="125" r="5" fill="currentColor"/>
    <path d="m153 125 7 7 12-14" stroke="#22213d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 19v-6h6M296 13h6v6M18 231v6h6M296 237h6v-6" stroke="currentColor" strokeOpacity=".45"/>
  </svg>
);
