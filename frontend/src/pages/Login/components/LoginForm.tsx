import React, { FormEvent, useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { Input } from '../../../shared/Input/Input';
import { LoginResponse } from '../../../api/models/LoginResponse';
import { httpClient } from '../../../api/httpClient';
import { Button } from '../../../shared/Button/Button';
import { History } from 'history';
interface LoginFormProps {
  history: History
}

export const LoginForm = ({ history }: LoginFormProps) => {

  const [isLoading, setIsLoading] = useState(false);

  const { onChange, formulario } = useForm({
    username: "",
    password: ""
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    httpClient.post<LoginResponse>('/users/sign_in', {}, { auth: formulario })
    .then((response) => {
      const { data } = response;
      console.log(data);
      setIsLoading(false);
      if(data.ok){
        history.push('/feed');
      }
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

      <Button
        buttonTitle="Login"
        type='submit'
        loading={isLoading}
        disabled={isLoading}
        bold
      />
    </form>
  )
}
