import React from 'react';
import {
  ApolloClient,
  ApolloProvider as ApolloProviderService,
  InMemoryCache,
  ApolloLink,
  createHttpLink,
} from '@apollo/client';

import { API_URL, TOKEN } from '../../constants/global';
import { authMiddleware } from '../../utils/utils';

export const httpLink = createHttpLink({ uri: API_URL });

interface IApolloProviderProps {
  children: any;
}

export const ApolloProvider: React.FunctionComponent<IApolloProviderProps> = (
  { children }: any,
) => {
  const apolloClient = new ApolloClient({
    link: ApolloLink.from([
      authMiddleware(TOKEN),
      httpLink,
    ]),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProviderService client={apolloClient}>
      {children}
    </ApolloProviderService>
  );
};
