import React from 'react';
import * as Icons from 'lucide-react';

const DynamicIcon = ({
  name,
  className = 'w-6 h-6',
  ...props
}) => {
  const IconComponent =
    Icons[name] || Icons.HelpCircle || Icons.Circle;

  if (!IconComponent) {
    return null;
  }

  return (
    <IconComponent
      className={className}
      strokeWidth={1.7}
      aria-hidden="true"
      {...props}
    />
  );
};

export default DynamicIcon;