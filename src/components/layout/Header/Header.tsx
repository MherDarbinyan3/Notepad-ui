import React from 'react';

import './header.scss';

interface IHeaderProps {}

export const Header: React.FunctionComponent<IHeaderProps> = () => (
  <div className='header'>
    Notepad Application
  </div>
)
