import React from 'react';
import { RouteComponentProps } from 'react-router';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { StyledLogin } from './styles';
import { LoginForm } from './components/LoginForm';



export const Login = ({ history }: RouteComponentProps) => {
  const googleReponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response); 
  }

  return (
    <StyledLogin>
      <div className="main-content">
        <LoginForm/>
        <GoogleLogin
          clientId={`${process.env.GOOGLE_CLIENT_ID}`}
          buttonText="Login"
          onSuccess={googleReponse}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </StyledLogin>
  )
}
