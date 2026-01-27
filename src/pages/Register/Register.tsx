import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Title from '../../components/Title/Title';
import type { AppDispatch } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import styles from './styles.module.css';

export function Register() {
        const dispatch = useDispatch<AppDispatch>();
        const navigate = useNavigate();

        const handleRegistr = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
                e.preventDefault();
                dispatch(userActions.clearErrorMessage());
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                const password = formData.get('pass') as string;

                await sendLogin(email, password);
        };

        const sendLogin = (email: string, password: string): void => {
                dispatch(login({ email, password }));
                navigate('/');
        };
        return (
                <div className={styles['login-page']}>
                        <Title>Регистрация</Title>
                        <form className={styles['form']} onSubmit={handleRegistr}>
                                <div className={styles['form-field']}>
                                        <Label htmlFor='email'>Ваш email</Label>
                                        <Input
                                                id='email'
                                                name='email'
                                                type='email'
                                                isValid
                                                placeholder='Email'
                                        />
                                </div>

                                <div className={styles['form-field']}>
                                        <Label htmlFor='pass'>Ваш пароль</Label>
                                        <Input
                                                id='pass'
                                                name='pass'
                                                type='password'
                                                isValid
                                                placeholder='Пароль'
                                        />
                                </div>

                                <div className={styles['form-field']}>
                                        <Label htmlFor='pass'>Ваше имя</Label>
                                        <Input
                                                id='name'
                                                name='name'
                                                type='text'
                                                isValid
                                                placeholder='Имя'
                                        />
                                </div>

                                <div className={styles['button-wrapper']}>
                                        <Button type='submit' size='big'>
                                                Зарегистрироваться
                                        </Button>
                                </div>
                        </form>

                        <div className={styles['text-wrapper']}>
                                <div>Есть аккаунт?</div>
                                <div>
                                        <Link to='/auth/login'>Войти</Link>
                                </div>
                        </div>
                </div>
        );
}
