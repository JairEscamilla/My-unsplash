import React from 'react';
import MyUnsplashLogo from '../../../assets/images/my_unsplash_logo.svg';
import { HeaderWrapper } from '../styles';


export const LoginHeader = () => {
  return (
    <HeaderWrapper>
      <img src={MyUnsplashLogo} alt="Logo de My unsplash" />
      <h2>Login</h2>
      <span>
        Welcome back.
      </span>
    </HeaderWrapper>
  )
}
