import React, { Dispatch, FormEvent, useState } from 'react'
import { useForm } from '../../../hooks/useForm';
import { Input } from '../../../shared/Input/Input';
import { LoginResponse, User } from '../../../api/models/LoginResponse';
import { httpClient } from '../../../api/httpClient';
import { Button } from '../../../shared/Button/Button';
import { connect } from 'react-redux';
import { doLogin } from '../../../actions';
import { useHistory } from 'react-router';

interface LoginFormProps {
  doLogin: (token: string, user: User) => void;
  setError: (error: boolean) => void;
}

const LoginForm = ({ doLogin, setError }: LoginFormProps) => {

  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
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
        doLogin(data.data.token, data.data.user);
        history.push("/feed");
      }
    }).catch(() => {
      console.error("Ha ocurrido un error");
      setError(true);    
      setIsLoading(false);
    });   
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        inputName="email"
        label="Email"
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

const mapDispatchToProps = {
  doLogin
}

export default connect(null, mapDispatchToProps)(LoginForm);