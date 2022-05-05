import React from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import DefaultButton from '../../../ui/Buttons/DefaultButton/DefaultButton';
import DefaultInput from '../../../ui/Inputs/DefaultInput/defaultInput';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage';
import {
  authFields,
  authValidation,
} from '../../../../validations/authValidation';
import { fetchAuth } from '../../../../store/reducers/login';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import FormContainer from '../../../ui/Containers/FormContainer/FormContainer';

const AuthForm = () => {
  const {
    isAuth,
    authForm: { success, message },
  } = useSelector((store) => store.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: authFields,
    validationSchema: authValidation,

    onSubmit: (user, { resetForm }) => {
      delete user.confirmPassword;
      user.id = uuidv4();
      dispatch(fetchAuth(user));
     resetForm();
    },
  });

  const goToLoginPage = () => {
    navigate('/');
  };

  return (
    <FormContainer>
      <form onSubmit={formik.handleSubmit}>
        <DefaultInput
          id="nickname"
          name="nickname"
          label="Nickname"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nickname}
        />
        {formik.touched.nickname && formik.errors.nickname ? (
          <ErrorMessage>{formik.errors.nickname}</ErrorMessage>
        ) : null}

        <DefaultInput
          id="name"
          name="name"
          label="Name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name ? (
          <ErrorMessage>{formik.errors.name}</ErrorMessage>
        ) : null}

        <DefaultInput
          id="email"
          name="email"
          label="Email"
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
          label="Password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <ErrorMessage>{formik.errors.password}</ErrorMessage>
        ) : null}

        <DefaultInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <ErrorMessage>{formik.errors.confirmPassword}</ErrorMessage>
        ) : null}

        {!success && (
          <Typography color="error" align="center">
            {message}
          </Typography>
        )}
        <DefaultButton type="submit">Submit</DefaultButton>
        {!!success && (
          <Typography color="success" align="center">
            {message}
          </Typography>
        )}
        {isAuth && (
          <DefaultButton onClick={goToLoginPage}>
            Go to login page
          </DefaultButton>
        )}
      </form>
    </FormContainer>
  );
};

export default AuthForm;
