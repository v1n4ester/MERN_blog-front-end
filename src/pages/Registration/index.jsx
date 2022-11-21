import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'Some Human',
      email: 'some2@gamil.com',
      password: '1234'
    },
    mode: "onChange" // коли має спрацьовувати валідація
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))

    if (!data.payload) {
      return alert('не полусилось авторизуватись!')
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token)
    }
  }


  if (isAuth) {
    return <Navigate to="/" />
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField 
        error={Boolean(errors.fullName?.message)}
        helperText={errors.fullName?.message}
        {...register('fullName', { required: 'Вкажіть повне ім`я' })}
        className={styles.field}
        label="Полное имя"
        fullWidth
      />
      <TextField 
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        type="email"
        {...register('email', { required: 'Вкажіть пошту' })}
        className={styles.field}
        label="E-Mail"
        fullWidth
      />
      <TextField 
        error={Boolean(errors.password?.message)}
        helperText={errors.password?.message}
        type="password"
        {...register('password', { required: 'Вкажіть пароль' })}
        className={styles.field}
        label="Пароль"
        fullWidth
      />
      <Button type='submit' disabled={!isValid} size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
