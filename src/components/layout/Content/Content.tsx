import React from 'react';

import './content.scss';

interface IContentProps {
  children: any;
}

export const Content: React.FunctionComponent<IContentProps> = ({ children }) => (
  <div className="content">
      {children}
  </div>
);
