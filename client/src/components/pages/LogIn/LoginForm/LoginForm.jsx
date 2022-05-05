import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DefaultButton from '../../../ui/Buttons/DefaultButton/DefaultButton';
import DefaultInput from '../../../ui/Inputs/DefaultInput/defaultInput';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage';
import {
  loginFormFields,
  loginFormValidation,
} from '../../../../validations/loginFormValidation';
import { useNavigate } from 'react-router';
import { Typography } from '@mui/material';
import { fetchLogin } from '../../../../store/reducers/login';
import FormContainer from '../../../ui/Containers/FormContainer/FormContainer';

const LoginForm = () => {
  const navigate = useNavigate();
  const { message, isLogin } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) {
      navigate('../main');
    }
  }, [isLogin, dispatch]);

  const formik = useFormik({
    initialValues: loginFormFields,
    validationSchema: loginFormValidation,

    onSubmit: (values) => {
      dispatch(fetchLogin(values));
    },
  });

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <DefaultInput
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <ErrorMessage>{formik.errors.email}</ErrorMessage>
        ) : null}

        <DefaultInput
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}

        {message && (
          <Typography color="error" align="center">
            {message}
          </Typography>
        )}
        <DefaultButton type="submit">Submit</DefaultButton>
      </form>
    </FormContainer>
  );
};;

export default LoginForm;
