import { useQuery } from '@apollo/client';
import { GIST_LIST } from '../gistTypeDefs';

export const useQueryGistList = (options?: any): any => (
  useQuery(GIST_LIST, options)
);
