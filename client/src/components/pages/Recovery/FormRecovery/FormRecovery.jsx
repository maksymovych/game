import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import DefaultButton from '../../../ui/Buttons/DefaultButton/DefaultButton';
import DefaultInput from '../../../ui/Inputs/DefaultInput/defaultInput';
import ErrorMessage from '../../../ui/ErrorMessage/ErrorMessage';
import * as Yup from 'yup';
import { Typography } from '@mui/material';
import { fetchRecovery } from '../../../../store/reducers/login';
import FormContainer from '../../../ui/Containers/FormContainer/FormContainer';
import Loader from '../../../ui/Loader/Loader';

const RecoveryForm = () => {
  const { nickname, confirmMessage, isFetching, recoveryDone } = useSelector(
    (state) => state.login
  );

  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: '', newPassword: '' },
    validationSchema: Yup.object({
      email: Yup.string().email().required('The email name is Required'),
      newPassword: Yup.string().required('Required').min(4),
    }),

    onSubmit: (values) => {
      dispatch(fetchRecovery(values));
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
          id="newPassword"
          name="newPassword"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newPassword}
        />
        {formik.touched.newPassword && formik.errors.newPassword ? (
          <ErrorMessage>{formik.errors.newPassword}</ErrorMessage>
        ) : null}
        {!!confirmMessage && (
          <Typography align="center">
            {!!nickname && nickname.toUpperCase() + ', '} {confirmMessage}
          </Typography>
        )}
        {!recoveryDone && (
          <DefaultButton disabled={isFetching} type="submit">
            {isFetching ? <Loader /> : 'Submit'}
          </DefaultButton>
        )}
      </form>
    </FormContainer>
  );
};

export default RecoveryForm;
