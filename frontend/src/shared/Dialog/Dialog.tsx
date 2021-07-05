import React from 'react';
import styled from 'styled-components';


type DialogProps = {
  reference: React.MutableRefObject<HTMLDialogElement | null>;
  title: string
}

const StyledDialog = styled.dialog ` 
  margin: 0 auto;
  border: none;
  width: 620px;
  border-radius: 12px;
  padding: 20px;
  margin-top: calc(50vh - 150px);
`;

const StyledTitle = styled.h3 ` 
  font-weight: 500;
  font-size: 24px;
`

export const Modal: React.FC<DialogProps> = ({ reference, children, title }) => {
  return (
    <StyledDialog ref={reference}>
      <StyledTitle>{title}</StyledTitle>    
      {children}
    </StyledDialog>
  )
}
