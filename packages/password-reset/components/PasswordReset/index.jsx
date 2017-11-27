import React from 'react';
import { Button, InputPassword } from '@bufferapp/components';
import { Field, reduxForm } from 'redux-form';
import { validate } from './validate.jsx';

const PasswordReset = ({handleSubmit, onSaveClick}) =>
  <form onSubmit={handleSubmit}>
    <Field
      name={'currentPassword'}
      component={InputPassword}
      label={'Current Password'}
    />
    <Field
      name={'newPassword'}
      component={InputPassword}
      label={'New Password'}
    />
    <Field
      name={'confirmPassword'}
      component={InputPassword}
    />
    <Button type={'submit'} onClick={onSaveClick}>Save</Button>
  </form>;

const formConfig = { form: 'password-reset', validate };
export default reduxForm(formConfig)(PasswordReset);
