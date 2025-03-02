async function page({ params }) {
	const { id } = await params;
	return <div>dynamic route : {id}</div>;
}

export default page;
