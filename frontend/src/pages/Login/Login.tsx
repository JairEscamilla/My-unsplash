import React, { FormEvent } from 'react';
import { httpClient } from '../../api/httpClient';
import { useForm } from '../../hooks/useForm';
import { LoginResponse } from '../../api/models/LoginResponse';
import { RouteComponentProps } from 'react-router';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { Spinner } from '../../shared/Spinner/Spinner';
import { Card } from '../../shared/Card/Card';
import { StyledLogin } from './styles';
import { Input } from '../../shared/Input/Input';

export const Login = ({ history }: RouteComponentProps) => {

  const { onChange, formulario } = useForm({
    username: "",
    password: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    httpClient.post<LoginResponse>('/users/sign_in', {}, { auth: formulario })
    .then((response) => {
      const { data } = response;
      data.ok && history.push("/feed");
          
    }).catch(() => {
      console.error("Ha ocurrido un error");    
    });   
  }

  const googleReponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    console.log(response); 
  }

  return (
    <StyledLogin>
      <div className="main-content" style={{  width: '80%' }}>
        <form onSubmit={handleSubmit}>
          <Input
            inputName="email"
            label="Email"
            placeholder="Suspendisee elit massa"
            onChange={({ target }) => onChange(target.value, 'username')}
          />
          <Input
            inputName="password"
            label="Password"
            type="password"
            onChange={({ target }) => onChange(target.value, 'password')}
          />

          <button type="submit">
            Login 
          </button>
        </form>
        <GoogleLogin
          clientId={`${process.env.GOOGLE_CLIENT_ID}`}
          buttonText="Login"
          onSuccess={googleReponse}
          cookiePolicy={'single_host_origin'}
        />
        <Spinner/>
      </div>
    </StyledLogin>
  )
}
