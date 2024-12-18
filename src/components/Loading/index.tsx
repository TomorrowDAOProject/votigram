import clsx from 'clsx';
import React from 'react';

interface ILoadingProps {
  className?: string;
}

// Loading component
const Loading: React.FC<ILoadingProps> = ({ className }) => {
  return (
    <div className={clsx('flex justify-center items-center bg-black/40', className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;