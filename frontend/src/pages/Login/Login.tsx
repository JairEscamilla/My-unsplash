import React, { FormEvent } from 'react';
import { httpClient } from '../../api/httpClient';
import { useForm } from '../../hooks/useForm';
import { LoginResponse } from '../../api/models/LoginResponse';
import { RouteComponentProps } from 'react-router';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

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
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email:
            <input type="text" name="email" onChange={({ target }) => onChange(target.value, 'username') } />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            Password:
            <input type="password" name="password" onChange={({ target }) => onChange(target.value, 'password')} />
          </label>
        </div>

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
    </div>
  )
}
