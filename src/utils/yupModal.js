import * as Yup from 'yup';

const name = Yup.string()
		.min(2, 'İsim en az 2 karakter olmalıdır.')
		.max(30, 'İsim en fazla 30 karakter olmalıdır.')
		.required('İsim alanı boş bırakılamaz.'),
	lastname = Yup.string()
		.min(2, 'Soyisim en az 2 karakter olmalıdır.')
		.max(30, 'Soyisim en fazla 30 karakter olmalıdır.')
		.required('Lütfen bir soyisim giriniz.'),
	tel = Yup.string().required('Lütfen telefon numaranızı giriniz.'),
	password = Yup.string()
		.min(5, 'Şifre en az 5 karakter olmalıdır.')
		.max(50, 'Şifre en fazla 50 karakter olmalıdır.')
		.required('Lütfen bir şifre giriniz.'),
	loginPassword = Yup.string().required('Lütfen bir şifre giriniz.'),
	confirmPassword = Yup.string()
		.oneOf([Yup.ref('password'), null], 'Şifreler uyuşmuyor.')
		.required('Lütfen şifreyi tekrar giriniz.'),
	email = Yup.string().email().required('Lütfen bir email adresi giriniz.');

export const loginSchema = {
	schema: Yup.object().shape({
		email,
		loginPassword,
	}),
	initialValue: { email: '', loginPassword: '', tandc: false },
};

export const registerSchema = {
	schema: Yup.object().shape({
		name,
		lastname,
		tel,
		password,
		confirmPassword,
		email,
	}),
	initialValue: {
		name: '',
		lastname: '',
		tel: '',
		email: '',
		password: '',
		confirmPassword: '',
	},
};
