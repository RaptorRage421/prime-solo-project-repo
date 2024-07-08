import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from '../RegisterForm/RegisterForm';
import Header from '../Header/Header';


function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <Header />
      <Header />
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
