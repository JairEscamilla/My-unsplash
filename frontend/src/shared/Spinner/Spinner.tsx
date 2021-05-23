import styled, { keyframes } from 'styled-components';

interface SpinnerProps {
  width?: string;
  height?: string;
  borderWidth?: string;
  spinnerColor?: string;
}

const SpinnerAnimation = keyframes `
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div<SpinnerProps> `
  border: ${props => props.borderWidth || '5px' } solid rgba(0, 0, 0, 0.1);
  width: ${props => props.width || '50px'};
  height: ${props => props.height || '50px'};
  border-radius: 50%;
  border-left-color: ${props => props.spinnerColor || '#3DB46D' } ;
  animation: ${SpinnerAnimation} 1s linear infinite;
`;