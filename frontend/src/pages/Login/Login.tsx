import React from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { GoogleAuthWrapper, OrWrapper, SignUpWrapper, StyledLogin } from './styles';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import { LoginHeader } from './components/LoginHeader';
import { Notification } from '../../shared/Notification/Notification';



export const Login = () => {
  const googleReponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response); 
  }

  return (
    <>
      <Notification text="Invalid email or password" variant="error"/>
      <StyledLogin>
        <div className="main-content">
          <LoginHeader/>
          <GoogleAuthWrapper>
            <GoogleLogin
              clientId={`${process.env.GOOGLE_CLIENT_ID}`}
              buttonText="Login"
              onSuccess={googleReponse}
              cookiePolicy={'single_host_origin'}
            />
          </GoogleAuthWrapper>
          <OrWrapper>
            OR
          </OrWrapper>
          <LoginForm/>
          <SignUpWrapper>
            Don´t you have an account? 
            <Link to="/" className="link">
              Join
            </Link>
          </SignUpWrapper>
        </div>
      </StyledLogin>
    </>
  )
}
