import {NOTE_FRAGMENT} from './fragment'
import { GET_NOTES } from './queries'

export const defaults = {
    notes:[
        {
            __typename:"Note",
            id:1,
            title: "First",
            content: "notes"

        }
    ]
};
export const typeDefs = [
    //schema가 어떤 형태인지 보여줘
    //graph ql 언어로 작성될것
    //이렇게 작성하는 이유는 서버가 없어서임 
    `
    schema{
        query: Query
        mutation: Mutation
    }
    type Query {
        notes: [Note]!
        note(id: Int!) :Note 
    }
    type Mutation{
        createNote(title: String!, content: String!):Note
        editNote(id:Int!, title: String!, content:String!):Note
    }
    type Note {
        id: Int!
        title: String!
        content: String!
    }
    `
];
export const resolvers = {
    //여기서 추출?
    Query:{
        note: (_, variables, {cache}) => {
            const id = cache.config.dataIdFromObject({__typename:"Note", id:variables.id})
            const note = cache.readFragment({fragment:NOTE_FRAGMENT, id})
            return note;
        }
    },
    Mutation:{
        createNote: (_, variables, {cache}) => {
            const {notes} = cache.readQuery({query:GET_NOTES});
            const {title, content} = variables;
            const newNote = {
                __typename: "Note",
                title,
                content,
                id: notes.length + 1
            };
            //새로운 note 작성 + array에 넣기
            cache.writeData({
                data: {
                    notes:[newNote, ...notes]
                }
            });
            return newNote;
        },
        editNote: (_, {id, title, content},{cache})=>{
            const noteId = cache.config.dataIdFromObject({__typename:"Note", id});
            const note = cache.readFragment({fragment: NOTE_FRAGMENT, id:noteId});
            const updatedNote = {
                ...note,
                title,
                content
            };
            cache.writeFragment({
                id:noteId,
                fragment: NOTE_FRAGMENT,
                data:updatedNote
            });
            return updatedNote;
        }
    }
}; 