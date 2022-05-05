import * as Yup from 'yup';

export const loginFormValidation = Yup.object({
  email: Yup.string().email().required('The email name is Required'),
  password: Yup.string().required('Required').min(4),
});

export const loginFormFields = {
  email: '',
  password: '',
};
