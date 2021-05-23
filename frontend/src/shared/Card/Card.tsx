import React, { FC } from 'react';
import styled from 'styled-components';


interface CardProps {
  cardTitle: string;
}

const StyledCard = styled.div `

`;

export const Card: FC<CardProps> = ({ cardTitle, children }) => (
  <StyledCard>
    { cardTitle }
    { children }
  </StyledCard>
)