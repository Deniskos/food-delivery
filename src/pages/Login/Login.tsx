import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Label from '../../components/Label/Label';
import Title from '../../components/Title/Title';
import type { AppDispatch, RootState } from '../../store/store';
import { login, userActions } from '../../store/user.slice';
import styles from './styles.module.css';

export function Login() {
        const dispatch = useDispatch<AppDispatch>();
        // const [error, setError] = useState<string | null>();
        const { loginErrorMessage, accessToken } = useSelector((store: RootState) => store.user);
        const navigate = useNavigate();

        useEffect(() => {
                if (accessToken) {
                        navigate('/');
                }
        }, [accessToken, navigate]);

        // useEffect(() => {
        //         dispatch(profile());
        //         navigate('/');
        // }, []);

        const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
                e.preventDefault();
                // setError(null);
                dispatch(userActions.clearErrorMessage());
                const formData = new FormData(e.currentTarget);
                const email = formData.get('email') as string;
                const password = formData.get('pass') as string;

                await sendLogin(email, password);
        };

        const sendLogin = (email: string, password: string): void => {
                dispatch(login({ email, password }));
                navigate('/');
                // try {
                //         const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
                //                 email,
                //                 password,
                //         });
                //         console.log('data', data);
                //         // localStorage.setItem('access_token', data.access_token);
                //         dispatch(addAccessToken(data.access_token));
                //         userActions;
                //         navigate('/');
                // } catch (e) {
                //         if (e instanceof AxiosError) {
                //                 console.log(e.response?.data.message);
                //                 setError(e.response?.data.message);
                //         }
                // }
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
                                {loginErrorMessage && (
                                        <div className={styles['error']}>{loginErrorMessage}</div>
                                )}
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
