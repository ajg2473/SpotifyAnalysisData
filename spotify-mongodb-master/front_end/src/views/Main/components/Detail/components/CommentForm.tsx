import React, { Component } from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
  margin: 10px 0;
  display: grid;
  grid-template-columns: 100px 1fr;
`;

const SubmitButton = styled.input`
  margin: 0 10px 0 0;
`;

type CommentProps = {
    handleSubmit: Function,
}

type CommentState = {
    nameField: string,
    messageField: string,
}

class CommentForm extends Component<CommentProps, CommentState> {
    state = {
        nameField: '',
        messageField: '',
    };

    updateField = (event:any) => {
        if (event.target.name && (event.target.value || event.target.value === '')) {
            // @ts-ignore
            this.setState({ [event.target.name]: event.target.value });
        }
    };

    render(): React.ReactNode {
        return (
            <FormContainer>
                <div>Name:</div>
                <input value={this.state.nameField} name="nameField" onChange={this.updateField} />
                <div>Comment:</div>
                <textarea value={this.state.messageField} name="messageField" onChange={this.updateField} />
                <SubmitButton type="button" value="submit" onClick={() => this.props.handleSubmit(this.state)}/>
                <div />
            </FormContainer>
        );
    }
}

export default CommentForm;
