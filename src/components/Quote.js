import "./Quote.scss";
import React from 'react';
import { useNavigate } from "react-router-dom";


function Quote({book, quote, id, date}) {
	const [day, month, year] = date.split("-");
	console.log(day, month, year)

	const createdDate = new Date(+year, +month - 1, +day);

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
					<cite className="quote-author additional-item">
						— Ulrich Nielsen
					</cite>
				</div>
			</div>
	 	</div>
  	)
}

export default Quote