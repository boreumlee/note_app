import gql from 'graphql-tag';
import {NOTE_FRAGMENT} from './fragment';

export const GET_NOTES = gql`
    {
        notes @client {
            ...Noteparts
        }
    }
    ${NOTE_FRAGMENT}
`;

//여기서 variable을 가져올거야
//apollo.js -> resolvers -> clientState.js (tpye Query안에 note 하나)
//그리고 note안에 title하고 content가져오는걸 적어야 하는데 우리가 fragment를 만들었으니 그걸 쓸거임
//fragment안에 있는 Noteparts를 사용하는거임
export const GET_NOTE = gql`
query getNote($id: Int!) @client {
    note(id: $id){
        ...Noteparts
    }
}
${NOTE_FRAGMENT}
`;