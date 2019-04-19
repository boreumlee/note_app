import {NOTE_FRAGMENT} from './fragment'

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
        createNote(title: String!, content: String!)
        editNote(id:Int!, title: String!, content:String!)
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
    // Mutation:{},
    Query:{
        note: (_, variables, {cache}) => {
            const id = cache.config.dataIdFromObject({__typename:"Note", id:variables.id})
            const note = cache.readFragment({fragment:NOTE_FRAGMENT, id})
            return note;
        }
    }
}; 