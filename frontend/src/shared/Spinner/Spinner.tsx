import styled, { keyframes } from 'styled-components';

const SpinnerAnimation = keyframes `
  from {
    transform: rotate(0deg);
  }

  to{
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.div `
  border: 5px solid rgba(0, 0, 0, 0.1);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border-left-color: #3DB46D;
  animation: ${SpinnerAnimation} 1s linear infinite;
`;