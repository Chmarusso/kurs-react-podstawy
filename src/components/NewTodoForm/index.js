import React from 'react';
import styled from 'styled-components'

const Button = styled.button`
  background: #232632;
  color: #00a7fa;
  width: 80px;
  height: 32px;
  font-size: 1.7em;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextInput = styled.input`
  padding: 5px;
  font-size: .7em;
  background: #232632;
  color: #d3d4d6;
  width: 100%;
  margin-right: 7px;
  border: 0px;
  -webkit-appearance: none;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  border: 2px solid #343744;
  background: #232632;
  border-radius: 10px;
  padding: 5px;
`

const NewTodoForm = ({onChange, draft, onSubmit}) => (
  <Container>
    <TextInput placeholder='Type something...' type='text' onChange={onChange} value={draft} />
    <Button onClick={onSubmit}>+</Button>
  </Container>
)

export default NewTodoForm
