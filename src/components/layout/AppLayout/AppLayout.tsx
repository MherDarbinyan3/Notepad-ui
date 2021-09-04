import React from 'react';

import { ApolloProvider } from '../../ApolloProvider/ApolloProvider';
import { Content } from '../Content/Content';
import { Header } from '../Header/Header';

import './appLayout.scss';

interface IAppLayoutProps {
  children: any;
}

export const AppLayout: React.FunctionComponent<IAppLayoutProps> = ({ children }) => (
  <div className='layout'>
      <ApolloProvider>
        <Header />
        <Content>
          {children}
        </Content>
      </ApolloProvider>
  </div>
)
