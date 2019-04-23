import React from 'react';
import Editor from '../../Components/Editor';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

// createNote 만들어 주는데 타이틀이 필요한데 여기서 타이틀이라 불리는 variable을 작성 => $title, content도 마찬가지
//그리고 clientState에서 보면 resolvers안에 mutation안에 createNote가 있어
//id를 return한거는 return은 해야하는데 return 할게 없어서 걍 쓴것
const ADD_NOTE = gql`
    mutation createNote($title: String!, $content: String!) @client {
        createNote(title: $title, content: $content){
            id
        }
    }
`;

export default class Add extends React.Component{
    //Editor에서 아무것도 받지 않은 상태에서 button 누르면 Editor안에 _onSave안에 onSave function이 작용하는데 이게 아직 여기로
    //넘어오지 않아서 에러가 난다 "TypeError: onSave is not a function"
    //function을 만들려면 mutation을 만들어야해

    render(){
        return <Mutation mutation={ADD_NOTE}>{
            createNote =>{
            this.createNote = createNote
            return <Editor onSave={this._onSave}/>}
            }</Mutation>;
    }
    _onSave = (title, content)=>{
        console.log(title,content);
        const {history:{push}} = this.props;
        if(title !== '' && content !== ''){
            this.createNote({variables:{title,content}})
            push("/");
        }
    }
}