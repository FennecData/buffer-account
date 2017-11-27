import React from 'react';
import { Button, InputPassword } from '@bufferapp/components';
import { Field, reduxForm } from 'redux-form';
import validate from './validate.jsx';

const currentPasswordStyle = {
  marginBottom: '30px'
}
const newPasswordStyle = {
  marginBottom: '10px'
}
const buttonStyle = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '30px'
};

const PasswordReset = ({handleSubmit}) =>
  <form>
    <div style={currentPasswordStyle}>
      <Field
        name={'currentPassword'}
        component={InputPassword}
        label={'Current Password'}
      />
    </div>
    <div style={newPasswordStyle}>
      <Field
        name={'newPassword'}
        component={InputPassword}
        label={'New Password'}
      />
    </div>
    <Field
      name={'confirmPassword'}
      component={InputPassword}
    />
    <div style={buttonStyle}>
      <Button type={'submit'} onClick={handleSubmit}>Save</Button>
    </div>
  </form>;

const formConfig = { form: 'password-reset', validate };
export default reduxForm(formConfig)(PasswordReset);
