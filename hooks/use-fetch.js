import { useState } from 'react';
import { toast } from 'sonner';

function useFetch(cb) {
	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(false); // Default to false
	const [error, setError] = useState(null);

	const fn = async (...args) => {
		setLoading(true);
		setError(null);
		try {
			const res = await cb(...args);
			setData(res);
		} catch (err) {
			setError(err);
			toast.error(err?.message || 'An unexpected error occurred');
		} finally {
			setLoading(false);
		}
	};

	return { data, loading, error, fn, setData };
}

export default useFetch;
