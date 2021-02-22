import React from 'react'
import RegisterForm from './RegisterForm';

export default function Register() {
  const handleSubmit = (values) => {
    console.log({values});
  }

  return (
    <React.Fragment>
      <RegisterForm onSubmit={handleSubmit} />
    </React.Fragment>
  )
}
