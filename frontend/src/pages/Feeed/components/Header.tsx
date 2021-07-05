import React, { FC } from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header ` 
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;

  .add-button {
    position: absolute;
    right: 20px;
  }

  @media (max-width: 630px){
    justify-content: center;
    .add-button {
      position: static;
      margin-left: 5px;
    }
  }

  @media (max-width: 475px){
    .searchbar {
      margin-bottom: 10px;
      margin-top: 10px;
    }
  }
`;

export const Header: FC = ({ children }) => {
  return (
    <StyledHeader>
      {children}
    </StyledHeader>
  )
}
