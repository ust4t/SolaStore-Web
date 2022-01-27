import ReactPaginate from 'react-paginate';

const PaginationList = ({ pageCount, handlePageClick }) => {
	return (
		<div className='row gy-3'>
			<ReactPaginate
				pageClassName='pagination-item'
				pageLinkClassName='basic-pagination basic-pagination-2'
				previousClassName=''
				nextClassName=''
				previousLabel={
					<i className='fas fa-angle-double-left basic-pagination basic-pagination-2 me-2 d-flex align-items-center justify-content-center' />
				}
				nextLabel={
					<i className='fas fa-angle-double-right basic-pagination basic-pagination-2 me-2 d-flex align-items-center justify-content-center' />
				}
				breakLabel={'...'}
				pageCount={pageCount}
				marginPagesDisplayed={4}
				pageRangeDisplayed={5}
				onPageChange={handlePageClick}
				containerClassName={
					'col-12 d-flex justify-content-center align-items-center flex-wrap'
				}
				activeClassName={'active'}
			/>
		</div>
	);
};

export default PaginationList;
