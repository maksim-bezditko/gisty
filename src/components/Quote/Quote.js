import "./Quote.scss";
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from "../..";
import { ref, remove, update } from "firebase/database";
import { useMemo } from "react";
import { useList } from "react-firebase-hooks/database";
// import { useDispatch } from "react-redux";

export const deleteQuoteById = (id) => {
	const userId = auth.currentUser.uid;
	const itemRef = ref(db, `data/users/${userId}/quotes/${id}`);

	return remove(itemRef)
}

function Quote({book, quote, id, timestamp}) {
	const createdDate = new Date(timestamp);
	const uid = auth.currentUser.uid;
	const [quotesSnapshots] = useList(ref(db, `data/users/${uid}/quotes`));
	// const dispatch = useDispatch();

	const quotesList = useMemo(() => {
		let arr = [];
		for (let i of quotesSnapshots) {
			arr.push(i.val())
		}
		return arr

	}, [quotesSnapshots]) 

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
					<div>
						<FontAwesomeIcon icon={faTrash} className="trash-icon" onClick={() => {
							try {
								deleteQuoteById(id)
								const postData = quotesList.filter(item => item.id !== id)

								const updates = {};
								updates[`/data/users/${uid}/quotes/`] = postData;
								update(ref(db), updates);
							} catch (e) {
								alert("Sorry, couldn't remove the book, try one more time.")
							}
						}}/>
					</div>
				</div>
			</div>
	 	</div>
  	)
}

export default Quote