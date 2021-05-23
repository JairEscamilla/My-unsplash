import React, { FormEvent } from 'react'
import { useForm } from '../../../hooks/useForm';
import { Input } from '../../../shared/Input/Input';
import { LoginResponse } from '../../../api/models/LoginResponse';
import { httpClient } from '../../../api/httpClient';

export const LoginForm = () => {
  const { onChange, formulario } = useForm({
    username: "",
    password: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    httpClient.post<LoginResponse>('/users/sign_in', {}, { auth: formulario })
    .then((response) => {
      const { data } = response;
      console.log(data);
      
    }).catch(() => {
      console.error("Ha ocurrido un error");    
    });   
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        inputName="email"
        label="Email"
        placeholder="Suspendisee elit massa"
        type='email'
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
  )
}
