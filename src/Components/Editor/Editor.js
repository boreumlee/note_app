import React,{Fragment} from 'react';
import styled from 'styled-components';
import MarkdownRenderer from 'react-markdown-renderer';
import TextareaAutosize from 'react-textarea-autosize';

const TitleInput = styled(TextareaAutosize)`
    font-size:50px;
    font-weight:600;
    width: 100%;
    &::placeholder{
        font-weight: 600;
    }
`;

const ContentPreview = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 50px;
`;

const ContentInput = styled(TextareaAutosize)`
    font-size: 18px;
    margin-top:15px;
`;

const TitleContainer = styled.div`
    display:flex;
    align-items: center;
    margin-bottom: 50px;
`;

const Button = styled.button``;

export default class Editor extends React.Component{
    // 여기는 mount되기전에 state 만드는 부분인것,
    constructor(props){
        super(props);
        this.state={
            title: props.title || "",
            content: props.content || "",
            id: props.id || null
        };
    }
    render(){
        const {title,content} =this.state;
        return(
            <Fragment>
                <TitleContainer>
                    <TitleInput value={title} onChange={this._onInputChange} placeholder={"Title을 입력해 주세요."} name={"title"}/>
                    <Button onClick={this._onSave}>Save</Button>
                </TitleContainer>
                <ContentPreview>
                    {/* 여기서 contentpreview가 grid repeat을 두개로 했으니까 처음에 input 그 옆이 markdown */}
                    <ContentInput value={content} onChange={this._onInputChange} placeholder={"# markdown형식이 적용 됩니다!"} name={"content"}/>
                    <MarkdownRenderer markdown={content} className={"markdown"}/>
                </ContentPreview>
            </Fragment>
        );
    }
    _onInputChange = event => {
        const {
            target: {value, name}
        } = event;
        this.setState({
            //여기서 name은 어디서 온거지?
            //여기서 name은 TitleInput과 ContentInput에서 name을 정해줬음 그것들이 여기 들어가는것 
            // ex. title: lalaal, content: djdjd
            [name]:value
        });
    };
    _onSave = () =>{
        //여기 onSave 변수는 왜 만든거지??
        //onSave(title, content, id); 이렇게 넘겨줄라고???? 
        //이 onSave function을 Add route를 통해 줄거야
        //그리고 다른 onSave function을 Edit route를 통해 줄거야
        const {onSave} = this.props;
        const {title,content,id} = this.state;
        onSave(title, content, id);
    };

}
