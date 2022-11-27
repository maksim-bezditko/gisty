import "./Quote.scss";
import React from 'react';

function Quote({book, quote, id, timestamp}) {
	const createdDate = new Date(timestamp);

  	return (
		<div className="quote-wrapper"> 
			<div className="quote">
				<blockquote className="quote-text">
					{quote}
				</blockquote>
				<div className="additional">
					<div className="quote-info additional-item">
						Added {createdDate.toDateString().slice(3)} from {book}
					</div>
				</div>
			</div>
	 	</div>
  	)
}

export default Quote