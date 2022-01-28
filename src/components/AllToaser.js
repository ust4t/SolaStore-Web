import { Toaster } from 'react-hot-toast';

const AllToaster = () => {
	return (
		<Toaster
			position='top-left'
			toastOptions={{
				duration: 5000,
			}}
		/>
	);
};

export default AllToaster;
