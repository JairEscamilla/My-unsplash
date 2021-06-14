import React, { useState } from 'react';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { GoogleAuthWrapper, OrWrapper, SignUpWrapper, StyledLogin } from './styles';
import LoginForm from './components/LoginForm';
import { Link } from 'react-router-dom';
import { LoginHeader } from './components/LoginHeader';
import { Notification } from '../../shared/Notification/Notification';



export const Login = () => {

  const [error, setError] = useState(false);

  const googleReponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response); 
  }

  console.log(error);
  

  return (
    <>
      <Notification 
        text="Invalid email or password" 
        variant="error" 
        isOpened={error} 
        setError={setError} 
      />
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
          <LoginForm setError={setError} />
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
