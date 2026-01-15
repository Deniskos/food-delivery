import axios, { AxiosError } from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Title from '../../components/Title/Title';
import { PREFIX } from '../../helpers/API';
import styles from './styles.module.css';

export function Login() {
        const [error, setError] = useState<string | null>();
        const handleLogin = async (e: React.FormEvent<HTMLFormElement>): void => {
                e.preventDefault();
                setError(null);
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                const password = formData.get('pass') as string;

                await sendLogin(email, password);
        };

        const sendLogin = async (email: string, password: string): void => {
                try {
                        const { data } = await axios.post(`${PREFIX}/auth/login`, {
                                email,
                                password,
                        });
                        console.log('data', data);
                } catch (e) {
                        if (e instanceof AxiosError) {
                                console.log(e.response?.data.message);
                                setError(e.response?.data.message);
                        }
                }
        };
        return (
                <div className={styles['login-page']}>
                        <Title>Вход</Title>
                        <form className={styles['form']} onSubmit={handleLogin}>
                                <div className={styles['form-field']}>
                                        <Label htmlFor='email'>Ваш email</Label>
                                        <Input
                                                id='email'
                                                name='email'
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
                                {error && <div className={styles['error']}>{error}</div>}
                                <div className={styles['button-wrapper']}>
                                        <Button type='submit' size='big'>
                                                Вход
                                        </Button>
                                </div>
                        </form>

                        <div className={styles['text-wrapper']}>
                                <div>Нет аккаунта?</div>
                                <div>
                                        <Link to='/auth/register'>Зарегистрироваться</Link>
                                </div>
                        </div>
                </div>
        );
}
