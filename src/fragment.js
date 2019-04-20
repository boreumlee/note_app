import gql from 'graphql-tag';

export const NOTE_FRAGMENT = gql`
    fragment Noteparts on Note {
        id
        title
        content
    }
`