import React from 'react';
import { useParams } from 'react-router-dom';

function SingleBook() {
	let { bookId } = useParams();

	return (
		<div className="">
			Single Book {bookId}
		</div>
	)
}

export default SingleBook