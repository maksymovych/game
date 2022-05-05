import * as Yup from 'yup';

export const authValidation = Yup.object({
  nickname: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('The NickName is Required'),
  name: Yup.string().max(20, 'Must be 20 characters or less'),
  email: Yup.string().email('Email is not valid').required('Email is required'),
  password: Yup.string().required('Required').min(4),
  confirmPassword: Yup.string()
    .required('Required')
    .when('password', {
      is: (val) => (val && val.length > 0 ? true : false),
      then: Yup.string().oneOf(
        [Yup.ref('password')],
        'Passwords are not equal'
      ),
    }),
});

export const authFields = {
  nickname: '',
  name: '',
  password: '',
  confirmPassword: '',
  email: '',
};
