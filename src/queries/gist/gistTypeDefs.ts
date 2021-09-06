import { gql } from '@apollo/client';

export const GIST_LIST = gql`
    query Gists {
        gists
    }
`;

export const GIST_BY_ID = gql`
    query Gist($id: String) {
        gist(id: $id)
    }
`;
