import React, {Fragment} from 'react';
import {Query} from 'react-apollo';
import { GET_NOTE } from "../../queries";
import styled from 'styled-components';
import MarkdownRenderer from 'react-markdown-renderer';
import {Link} from 'react-router-dom';

//justify-content: space-between => TitleComponent들 사이에 space가 있는거
const TitleComponent = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 50px;
`;

const Title = styled.h1`
    font-size: 50px;
    margin: 0;
    padding: 0;
`;

const Button = styled.button``;


export default class Note extends React.Component{
    render(){
        console.log('this is props', this.props);
        //이렇게 하면 props안에 match.params={id:1} 이렇게 있음
        const {match: {params: {id}}} = this.props;
        //왜냐면 query는 variables이 필요하기떄문에
        //여기서 variables={{id}} 는 id: id인데 둘이 같으니까 하나만 작성한것 javascript기능
 
        return (
            //여기서 URL에서 ID값을 가져와야해 
            <Query query={GET_NOTE} variables={{id}}>
                {({data}) =>data.note ? (
                    <Fragment>
                        <TitleComponent>
                            <Title>{data.note && data.note.title}</Title>
                            <Link to={`/edit/${data.note.id}`}>
                                <Button>Edit</Button>
                            </Link>
                        </TitleComponent>
                        <MarkdownRenderer markdown={data.note.content} className={"markdown"}/>
                    </Fragment>
                ):null}
            </Query>
        );
    }
}