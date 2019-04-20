import React ,{Fragment}from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {ReactComponent as Plus} from '../../Components/plus.svg'
import {Query} from 'react-apollo';
import { GET_NOTES } from "../../queries";

const Header = styled.div`
    margin-bottom: 50px;
`;

const Title = styled.h1`
    font-size: 50px;
    font-weight: 600;
    margin: 0;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
`;
//transform: scale(0.8) 이미지 크기를 0.8 배만큼 확대시킨다.
const Button = styled.div`
    margin-left: 10px;
    transfrom: scale(0.8);
    background-color: #eee;
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
`;

const Subtitle = styled.h2`
    color: #a4b0be;
    font-weight: 400;
`;

const Notes = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Note = styled.div`
    padding: 10px;
    padding-left: 5px;
    transition: background-color 0.1s ease;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 10px;
    &:hover {
      background-color: #eeeeee;
    }
`;

const NoteTitle = styled.span`
    padding-bottom: 5px;
    font-weight: 600;
    font-size: 20px;
`;


export default class NotesContainer extends React.Component{
    render(){
        return(
            <Fragment>
                <Header>
                    <Title>
                        Luna's Notes!
                        <Link to={"/add"}>
                            <Button><Plus/></Button>
                        </Link>
                    </Title>
                    <Subtitle>Taking notes what you want, How many you want!</Subtitle>
                </Header>
                <Query query={GET_NOTES}>
                    {({data})=> 
                        data.notes ? data.notes.map(note => (
                            <Link to={`/edit/${note.id}`} key={note.id}>
                                <Note>{note.title}</Note>
                            </Link>
                        ))
                        : null
                    }
                </Query>
            </Fragment>
        );
    }
}