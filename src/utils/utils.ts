import { ApolloLink } from '@apollo/client';

export const authMiddleware = (token: string) => new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: token,
    }
  });

  return forward(operation);
});