import React from 'react';

interface TrophyIconProps {
  className?: string;
  [key: string]: any;
}

export const TrophyIcon: React.FC<TrophyIconProps> = ({ className = "h-5 w-5", ...props }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    className={className}
    {...props}
  >
    <g fill="none">
      <path 
        fill="currentColor" 
        d="M12 3.67L6.12 6.363v6.616L12 16.41l5.88-3.43V6.364zm1.96 16.66L12 17.39l-1.96 2.94H8.08l-.98 2.94h9.8l-.98-2.94z"
      />
      <path 
        fill="currentColor" 
        opacity="0.3"
        d="M16.9 23.27H7.1l.49-1.47h8.82zM12 3.67l5.88 2.695v6.615L12 16.41zm0 16.66h1.96L12 17.39zm0-19.6L10.53 2.2L12 3.67l1.47-1.47z"
      />
      <path 
        stroke="currentColor" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M17.88 12.98L12 16.41l-5.88-3.43V6.364L12 3.67l5.88 2.696zm-7.84 7.35h3.92L12 17.39zM12 .73L10.53 2.2L12 3.67l1.47-1.47zm0 16.66v-.98M6.12 6.365l-4.9-1.716L2.2 12l1.96 1.47l-1.47 1.96m15.19-9.065l4.9-1.716L21.8 12l-1.96 1.47l1.47 1.96M6.12 8.57h11.76m-.98 14.7H7.1l.98-2.94h7.84z" 
        strokeWidth="1"
      />
    </g>
  </svg>
); 