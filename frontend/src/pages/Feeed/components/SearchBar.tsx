import React from 'react';
import styled from 'styled-components';
import { IoIosSearch } from "react-icons/io";

interface SearchbarProps {
  className?: string;
}

const StyledSearchbar = styled.form ` 
  position: relative;
  & .search-icon {
    position: absolute;
    left: 5px;
    color: #BDBDBD;
    z-index: 1;
    width: 30px;
    height: 30px;
    top: 13px;
  }
`;

const StyledInput = styled.input `
  width: 300px;
  height: 55px;
  border: 1px solid #BDBDBD;
  border-radius: 12px;
  padding-left: 40px;
  outline: none;
  font-size: 19px;
  transition: filter 1s;

  &:focus {
    filter: drop-shadow(0px 1px 6px rgba(0, 0, 0, 0.1));
  }

  &::placeholder{
    font-weight: 500;
    font-size: 14px;
    line-height: 19px;
  }
`;

export const SearchBar = ({ className = "" }: SearchbarProps) => {
  return (
    <StyledSearchbar>
      <IoIosSearch
        className={`search-icon ${className}`}
      />
      <StyledInput 
        type="text" 
        placeholder="Search by name"
        className={className}
      />
    </StyledSearchbar>
  )
}
