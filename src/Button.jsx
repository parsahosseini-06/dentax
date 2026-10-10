import React from 'react';
export function Button(props) {
  const { variant = 'primary', size = 'md', children, disabled = false, style, ...rest } = props;
  const variants = {
    primary: { background: 'var(--color-primary)', color: 'var(--color-text-primary)', border: '1px solid var(--color-primary)' },
    secondary: { background: 'var(--color-white)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' },
    ghost: { background: 'transparent', color: 'var(--color-text-primary)', border: '1px solid transparent' }
  };
  const sizes = {
    sm: { padding: 'var(--space-sm) var(--space-lg)', fontSize: 'var(--font-size-sm)' },
    md: { padding: 'var(--space-md) var(--space-xl)', fontSize: 'var(--font-size-base)' },
    lg: { padding: 'var(--space-lg) var(--space-2xl)', fontSize: 'var(--font-size-lg)' }
  };
  return React.createElement('button', {
    style: { ...variants[variant], ...sizes[size], borderRadius: 'var(--border-radius-md)', fontWeight: 'var(--font-weight-semibold)', fontFamily: 'var(--font-family-primary)', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1, transition: 'all var(--transition-base)', ...style },
    disabled, ...rest
  }, children);
}