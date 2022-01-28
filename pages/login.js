import { useEffect } from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import InputGroup from '../src/components/form/InputGroup';
import Layout from '../src/layout/Layout';
import PageTitle from '../src/layout/PageTitle';
import * as Yup from 'yup';
import { CREATE_USER_ID } from '../src/redux/action/type';
import { useRouter } from 'next/router';
// import { loginSchema } from "../src/utils/yupModal";

const Login = () => {
	const { push } = useRouter();
	const user = useSelector((state) => state.auth.state);
	const dispatch = useDispatch();
	// const [showPassword, setShowPassword] = useState(false);

	useEffect(() => {
		if (user === 'user_registered') {
			push('/dashboard');
		}
	}, []);

	const loginSchema = Yup.object().shape({
		email: Yup.string().email('Invalid email').required('Required'),
		password: Yup.string().required('Required'),
	});

	const initialValues = {
		email: '',
		password: '',
	};

	const handleLogin = async ({ email, password }, { setSubmitting }) => {
		try {
			const { data } = await axios.post('/api/auth/loginUser', null, {
				params: {
					email,
					password,
				},
			});

			dispatch({
				type: CREATE_USER_ID,
				payload: {
					uuid: data.data.userID,
					state: 'user_registered',
					name: `${data.data.userName} ${data.data.userSurname}`,
				},
			});
			toast.success('Başarılı bir şekilde giriş yaptınız.');
			push('/');
		} catch (error) {
			console.log(error);
			toast.error('Bir hata oluştu. Lütfen tekrar deneyiniz.');
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<Layout news={4} logoLeft layout={2} paymentOption>
			<main>
				<PageTitle active='Login' pageTitle='Login' />
				<section className='login-area pt-100 pb-100'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-8 offset-lg-2'>
								<div className='basic-login'>
									<h3 className='text-center mb-60'>Login From Here</h3>
									<Formik
										initialValues={initialValues}
										validationSchema={loginSchema}
										onSubmit={handleLogin}>
										{({
											values,
											errors,
											handleChange,
											handleBlur,
											handleSubmit,
											isSubmitting,
										}) => (
											<form onSubmit={handleSubmit}>
												<div className='row'>
													<div className='col-12'>
														<InputGroup
															label='Email'
															id='email'
															name='email'
															type='email'
															placeholder='Email giriniz...'
															values={values.email}
															errors={errors.email}
															handleBlur={handleBlur}
															handleChange={handleChange}
														/>
													</div>
													<div className='col-12'>
														<InputGroup
															label='Şifre'
															id='password'
															name='password'
															type='password'
															placeholder='Şifreyi giriniz...'
															values={values.password}
															errors={errors.password}
															handleBlur={handleBlur}
															handleChange={handleChange}
														/>
													</div>
												</div>

												<button
													disabled={isSubmitting}
													className='bt-btn theme-btn-2 w-100'>
													Giriş Yap
												</button>
												<div className='or-divide'>
													<span>ya da</span>
												</div>
												<Link href='/register'>
													<a className='bt-btn bt-btn-black w-100 text-center'>
														Kayıt Ol
													</a>
												</Link>
											</form>
										)}
									</Formik>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
			<script src='js/passopen.js'></script>
		</Layout>
	);
};

export default Login;
