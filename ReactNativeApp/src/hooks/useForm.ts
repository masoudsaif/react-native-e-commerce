import {useRef, useState} from 'react';

const useForm = <T>(initialValues: T) => {
  const initialValuesRef = useRef({...initialValues});
  const [values, setValues] = useState(initialValues);

  const handleCreateHandler = (name: keyof T) => (text: string) =>
    setValues(prev => ({...prev, [name]: text}));

  const handleResetForm = () => setValues(initialValuesRef.current);

  return {values, handleCreateHandler, handleResetForm};
};

export default useForm;
