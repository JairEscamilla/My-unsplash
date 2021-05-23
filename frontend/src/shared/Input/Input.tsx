import React from 'react';
import styled from 'styled-components';

interface InputProps {
  label: string;
  inputName: string;
  placeholder?: string;
  type?: 'text' | 'password';
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const StyledInputContainer = styled.div `
  margin: 20px 0;
  & label {
    display: block;
    margin-bottom: 10px;
    font-weight: 600;
  }
`;

const StyledInput = styled.input `
  outline: none;
  border: 1px solid #4F4F4F;
  padding: 10px;
  width: 100%;
  filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  border-radius: 7px;
`;


export const Input = ({
  label, 
  inputName,
  placeholder = '',
  type = 'text',
  onChange
}: InputProps) => (
  <StyledInputContainer>
    <label htmlFor={inputName}>
      {label}
    </label>
    <StyledInput
      placeholder={placeholder}
      name={inputName}
      type={type}
      onChange={onChange}
    />
  </StyledInputContainer>
);