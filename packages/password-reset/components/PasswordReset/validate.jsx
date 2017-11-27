const validate = values => {
  const errors = {}

  if (!values.currentPassword) {
    errors.currentPassword = 'Required'
  }

  if (!values.newPassword) {
    errors.newPassword = 'Required'
  } else if (values.newPassword.length < 6) {
    errors.newPassword = 'Must be 6 characters or more'
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = 'Required'
  } else if (values.newPassword != values.confirmPassword) {
    errors.confirmPassword = 'New passowrd doesn\'t match'
  }

  return errors
}

export default validate;
