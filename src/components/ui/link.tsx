import React from 'react';
import cn from 'classnames';

interface LinkProps {
  variant?: 'normal' | 'light';
  className?: string;
  href: string;
  children: React.ReactNode;
}

export default function Link({ 
    className = '', 
    href, 
    children, 
    variant = 'normal' 
}: LinkProps) {
  return (
    <a 
      className={cn(
        `transition-colors ${className}`,
        variant === "normal" && 'text-secondary hover:text-accent',
        variant === "light" && 'text-primary hover:text-secondary'
      )} 
      href={href}
    >
      {children}
    </a>
  );
}
