import React from 'react';
import styled from 'styled-components';
import { Spinner } from '../Spinner/Spinner';

export enum ButtonVariants {
  Primary =  '#3DB46D',
  Warning = '#EB5757',
}

interface ButtonProps {
  buttonTitle: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  variant?: ButtonVariants;
  bold?: boolean;
  width?: string;
}

interface StyledButtonProps {
  variant: ButtonVariants;
  bold: boolean;
  width: string;
}

const StyledButton = styled.button<StyledButtonProps>`
  display: block;
  border-radius: 5px;
  padding: 8px 15px;
  border: none;
  color: white;
  width: ${props => props.width};
  height: 40px;
  background: ${props => props.variant};
  font-size: 1rem;
  font-weight: ${props => props.bold? 'bold' : '100'};
  margin: 10px 0;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
  transition: 0.1s linear;

  &:active {
    transform: scale(0.98);
  }

  &:disabled, &[disabled] {
    opacity: 0.5;
  }
`;

const SpinnerContainer = styled.div `
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const Button = ({
  buttonTitle,
  disabled = false,
  type = 'button',
  loading = false,
  variant = ButtonVariants.Primary,
  bold = false,
  width = '100%'
}: ButtonProps) => (
  <StyledButton disabled={disabled} type={type} variant={variant} bold={bold} width={width}>
    { loading ? 
        <SpinnerContainer>
          <Spinner
            width='20px'
            height='20px'
            borderWidth='2px'
            spinnerColor='white'
          />
        </SpinnerContainer>
      : <>
          { buttonTitle }
        </>
    }
  </StyledButton>
);