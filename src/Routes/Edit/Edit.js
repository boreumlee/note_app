import React from 'react';
import {Query,Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import {GET_NOTE} from '../../queries';
import Editor from '../../Components/Editor'

const EDIT_NOTE = gql`
    mutation editNote($id:INT!, $title: String!, $content: String!) @client {
        editNote(id: $id, title: $title, content: $content){
            id
        }
    }
`;

export default class Edit extends React.Component{
    render(){
        //note.js처럼 id 값을 가져와야해
        const {match:{params:{id}}} = this.props;
        // editor한테 props를 넘겨줘야해 editor가 가지고 있는 prop이 title하고 content 하고 id
        return <Query query={GET_NOTE} variables={{id}}>{
            ({data})=> data.note ? 
            (<Mutation mutation={EDIT_NOTE}>{
                editNote => {this.editNote = editNote;
                return (<Editor title={data.note.title} content={data.note.content} id={data.note.id} onSave={this._onSave}/>);}
                }
            </Mutation>):null
            }</Query>;
    }
    _onSave = (title, content, id) => {
        const {history:{push}} = this.props;
        if(title !== '' && content !== '' && id){
            this.editNote({variables: { title, content, id}});
            push("/");
        }
    }
}