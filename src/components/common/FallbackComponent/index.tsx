import React from 'react';

interface FallbackComponentProps {
  error: Error;
  componentStack: string;
  resetError: Function;
}

// TODO: Show a nice looking, detailed fallback.

export default function FallbackComponent({
  error,
  componentStack,
  resetError,
}: FallbackComponentProps) {
  console.log('FallbackComponent', {
    error,
    componentStack,
    resetError: resetError(),
  });

  return (
    <div>
      <h1>An error has occured</h1>
    </div>
  );
}
