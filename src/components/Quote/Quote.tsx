import styles from "./Quote.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { auth, db } from "../../main";
import { ref, remove, update } from "firebase/database";
import useQuoteList from "../../hooks/useQuoteList";
import classNames from "classnames";

import { IQuote } from "../../types";

export const deleteQuoteById = (id: any) => {
	if (auth.currentUser) {
		const userId = auth.currentUser.uid;
		const itemRef = ref(db, `data/users/${userId}/quotes/${id}`);
		return remove(itemRef)
	
	}
}

function Quote({book, quote, id, timestamp}: Omit<IQuote, "addedFrom">) {
	const createdDate = new Date(timestamp);
	const uid = auth?.currentUser?.uid;
	const {quotes} = useQuoteList()

  	return (
		<div className={styles.quoteWrapper}> 
			<div className={styles.quote}>
				<blockquote className={styles.quoteText}>
					{quote}
				</blockquote>
				<div className={styles.additional}>
					<div className={classNames(styles.quoteInfo, styles.additionalItem)}>
						Added {createdDate.toDateString().slice(3)} from {book}
					</div>
					<div>
						<FontAwesomeIcon icon={faTrash} className={styles.trashIcon} onClick={() => {
							try {
								deleteQuoteById(id)
								const postData = quotes.filter((item) => item.id !== id)

								const updates: {
									[key: string]: typeof postData
								} = {};
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