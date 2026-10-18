import React from 'react';
import * as Icons from 'lucide-react';

const DynamicIcon = ({ name, className = "w-6 h-6", ...props }) => {
  const IconComponent = Icons[name] || Icons.HelpCircle;
  return <IconComponent className={className} {...props} />;
};

export default DynamicIcon;