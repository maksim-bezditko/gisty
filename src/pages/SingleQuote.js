import React from 'react'
import { useParams } from 'react-router-dom';

function SingleQuote() {
	const { quoteId } = useParams();

  return (
		<div className="">
			Single Quote {quoteId}
		</div>
  );
}

export default SingleQuote;