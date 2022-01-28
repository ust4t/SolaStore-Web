import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import sources from '../sources';
import { StoreContext } from '../src/context/StoreProvider';
import Layout from '../src/layout/Layout';
import PageTitle from '../src/layout/PageTitle';

const OrderSuccess = ({ orderList, buyer }) => {
	const { state } = useContext(StoreContext);
	return (
		<Layout news={4} logoLeft layout={2} paymentOption>
			<main>
				<PageTitle
					pageTitle='SİPARİŞİNİZ İÇİN TEŞEKKÜR EDERİZ'
					thankupage
					active='order success'
					id={orderList[0].orderID}
				/>
				<section className='cart-area pt-100 pb-100'>
					<div className='container'>
						<div className='row'>
							<div className='col-lg-6'>
								<form onSubmit={(e) => e.preventDefault()}>
									<div className='table-content table-responsive'>
										<table className='table'>
											<thead>
												<tr>
													<th className='product-thumbnail'>Images</th>
													<th className='cart-product-name'>Product</th>
													<th className='product-price'>Unit Price</th>
													<th className='product-quantity'>Quantity</th>
													<th className='product-subtotal'>Total</th>
												</tr>
											</thead>
											<tbody>
												{state.completedCartData.carts &&
													state.completedCartData.carts.map((cart) => (
														<tr key={cart.chartID}>
															<td className='product-thumbnail'>
																<a href='#' onClick={(e) => e.preventDefault()}>
																	<img
																		src={`${sources.imageMinSrc}${cart.pictureOneGuidName}`}
																		alt='cart'
																	/>
																</a>
															</td>
															<td className='product-name'>
																<a href='#' onClick={(e) => e.preventDefault()}>
																	{cart.productShortName}
																</a>
															</td>
															<td className='product-price'>
																<span className='amount'>
																	${Number(cart.price).toFixed(2)}
																</span>
															</td>

															<td className='product-price'>
																<span className='amount'>
																	{Number(cart.quantity)}
																</span>
															</td>

															<td className='product-subtotal'>
																<span className='amount'>
																	${Number(cart.price) * Number(cart.quantity)}
																</span>
															</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
									<div className='cart-page-total'>
										<h2>Cart totals</h2>
										<ul className='mb-20'>
											<li>
												Total <span>${orderList[0].totalAmount}</span>
											</li>
										</ul>
									</div>
								</form>
							</div>
							<div className='col-lg-6 order-success'>
								<div className='row'>
									<div className='col-md-6'>
										<h5>Summary :</h5>
										<p>
											<b>Order ID:</b> {orderList[0].orderID}
										</p>
										<p>
											<b>Order Date:</b>{' '}
											{moment(orderList[0].addingDate).format('MMMM DD, YYYY')}
										</p>
										<p>
											<b>Order Total:</b> ${orderList[0].totalAmount}
										</p>
									</div>
									<div className='col-md-6'>
										<h5>Shipping Address</h5>
										<p className='text-capitalize'>
											<b>Name:</b> {buyer.buyerName}
										</p>
										<p>
											<b>Contact No:</b> {buyer.buyerPhone}
										</p>
									</div>
									<div className='col-12 mt-4'>
										<h5>
											<b>Payment Method:</b>{' '}
											{buyer.paymentMethod === 'order'
												? 'Cari Ödeme'
												: 'Kredi Kartı'}
										</h5>
										{/* <div className="bg-light p-3 mt-4 text-center">
                      <h5>Expected Date Of Delivery</h5>
                      <h2>{moment(date).format("MMMM DD, YYYY")}</h2>
                    </div> */}
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</Layout>
	);
};

export default OrderSuccess;

export async function getServerSideProps({ query }) {
	const { orderID, user, buyerName, buyerPhone, paymentType } = query;
	const { data: orderList } = await axios.get(
		`https://api.solastore.com.tr/api/Order/OrderList?UserID=${user}&sourceProof=${process.env.SOURCE_PROOF}`
	);

	return {
		props: {
			orderList: orderList.filter((order) => order.orderID === Number(orderID)),
			buyer: {
				orderID,
				buyerName,
				buyerPhone,
				paymentType,
			},
		},
	};
}
