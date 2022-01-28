import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

import InputGroup from '../../src/components/form/InputGroup';
import Layout from '../../src/layout/Layout';
import PageTitle from '../../src/layout/PageTitle';
import { StoreContext } from '../../src/context/StoreProvider';
import PayModal from '../../src/components/Modals/PayModal/PayModal';

const Checkout = () => {
	const [payModal, setPayModal] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [paymentBox, setPaymentBox] = useState(null);
	const { state } = useContext(StoreContext);
	const { orderID, amount } = state.completedCartData;
	console.log(state.completedCartData);

	const checkoutInitialValues = {
		cardNumber: '',
		cardHoldersName: '',
		expirationYear: '',
		expirationMonth: '',
		cvv: '',
	};

	const checkoutSchema = Yup.object().shape({
		cardNumber: Yup.string()
			.required('Required')
			.matches(/^[0-9]{16}$/, 'Must be 16 digits'),
		cardHoldersName: Yup.string()
			.required('Required')
			.matches(/^[a-zA-Z ]{2,30}$/, 'Must be 2-30 characters'),
		expirationYear: Yup.string()
			.required('Required')
			.matches(/^[0-9]{2}$/, 'Must be 2 digits'),
		expirationMonth: Yup.string().required('Required'),
		cvv: Yup.string()
			.required('Required')
			.matches(/^[0-9]{3}$/, 'Must be 3 digits'),
	});

	const handlePayment = async (values, { resetForm }) => {
		const rnd = Date.now();
		try {
			const { data: hashData } = await axios.post('/api/payment/generateHash', {
				oid: `${orderID}`,
				amount: `${amount}`,
				okUrl: 'https://api.solastore.com.tr/api/Helpers/CCSuccess',
				failUrl: 'https://api.solastore.com.tr/api/Helpers/CCFail',
				islemtipi: 'Auth',
				taksit: '',
				rnd: `${rnd}`,
			});
			await fetchPay({
				oid: orderID,
				amount,
				...values,
				rnd,
				...hashData.data,
			});
			// router.push("/checkout/pay");
			setPayModal(true);
			resetForm();
		} catch (err) {
			toast.error('Bir hata oluştu');
			console.log(err);
		}
	};

	const fetchPay = async (buyerValues) => {
		const {
			hash,
			amount,
			oid,
			rnd,
			cardNumber,
			expirationMonth,
			expirationYear,
			cvv,
		} = buyerValues;

		setIsLoading(true);

		try {
			const { data } = await axios.post('/api/payment/orderPay', {
				oid,
				amount,
				hash,
				rnd,
				pan: cardNumber,
				Ecom_Payment_Card_ExpDate_Year: expirationYear,
				Ecom_Payment_Card_ExpDate_Month: expirationMonth,
				cv2: cvv,
			});
			// const cleanHtml = DOMPurify.sanitize(data.data, {
			//   ADD_TAGS: ["link", "style"],
			// });
			setPaymentBox(data.data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			toast.error('Bir hata oluştu');
		}
	};

	return (
		<Layout news={4} logoLeft layout={2} paymentOption>
			<main>
				<PageTitle active='Checkout' pageTitle='Checkout' />
				<PayModal
					show={payModal}
					handleClose={() => setPayModal(false)}
					isLoading={isLoading}
					paymentBox={paymentBox}
				/>
				<Formik
					initialValues={checkoutInitialValues}
					validationSchema={checkoutSchema}
					onSubmit={handlePayment}>
					{({ values, errors, handleChange }) => (
						<section className='checkout-area pb-70'>
							<div className='container'>
								<Form>
									<div className='row justify-content-center'>
										<div className='col-lg-6'>
											<div className='checkbox-form'>
												<h3>Billing Details</h3>
												<div className='row'>
													<div className='col-md-12'>
														<div className='checkout-form-list'>
															<InputGroup
																name='CardNum'
																id='CardNum'
																label='Card Number'
																errors={errors.cardNumber}
																values={values.cardNumber.replace(' ', '')}
																handleChange={handleChange('cardNumber')}
															/>
														</div>
													</div>
													<div className='col-md-12'>
														<div className='checkout-form-list'>
															<InputGroup
																name='CardHoldersName'
																id='CardHoldersName'
																label='Card Holder Name'
																errors={errors.cardHoldersName}
																values={values.cardHoldersName}
																handleChange={handleChange('cardHoldersName')}
															/>
														</div>
													</div>
													<div className='col-md-4'>
														<div className='checkout-form-list'>
															<InputGroup
																name='ExpirationYear'
																id='ExpirationYear'
																label='Expiration Year'
																errors={errors.expirationYear}
																values={values.expirationYear}
																handleChange={handleChange('expirationYear')}
															/>
														</div>
													</div>
													<div className='col-md-4'>
														<div className='checkout-form-list'>
															<InputGroup
																name='ExpirationMonth'
																id='ExpirationMonth'
																label='Expiration Month'
																errors={errors.expirationMonth}
																values={values.expirationMonth}
																handleChange={handleChange('expirationMonth')}
															/>
														</div>
													</div>
													<div className='col-md-4'>
														<div className='checkout-form-list'>
															<InputGroup
																name='CVV'
																id='CVV'
																label='CVV'
																errors={errors.cvv}
																values={values.cvv}
																handleChange={handleChange('cvv')}
															/>
														</div>
													</div>
													<div className='order-button-payment mt-20'>
														<button type='submit' className='bt-btn theme-btn'>
															Place order
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</Form>
							</div>
						</section>
					)}
				</Formik>
			</main>
		</Layout>
	);
};

export default Checkout;
