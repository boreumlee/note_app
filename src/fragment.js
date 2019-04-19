import gql from 'graphql-tag';

export const NOTE_FRAGMENT = gql`
    fragment Notepars on Note {
        id
        title
        content
    }
`