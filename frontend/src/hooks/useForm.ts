import { useState } from 'react';

export const useForm = <T extends Object>(formulario: T) => {
  const [state, setState] = useState(formulario);
  
  const onChange = (value: string, field: keyof T) => {
    setState({
      ...state,
      [field]: value
    });
  }

  return {
    ...state, 
    formulario: state,
    onChange,
  }
}