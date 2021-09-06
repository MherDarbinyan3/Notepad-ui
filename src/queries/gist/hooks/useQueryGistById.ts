import { useLazyQuery } from '@apollo/client';
import { GIST_BY_ID } from '../gistTypeDefs';

export const useQueryGistById = (options?: any): any => (
  useLazyQuery(GIST_BY_ID, options)
);
