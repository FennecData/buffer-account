import React from 'react';
import {Button, InputPassword} from '@bufferapp/components';
import { Field, reduxForm } from 'redux-form';

const PasswordReset = ({onSaveClick}) =>
  <div>
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

    <Button onClick={onSaveClick}>Save</Button>
  </div>;

const formConfig = { form: 'password-reset' };
export default reduxForm(formConfig)(PasswordReset);
