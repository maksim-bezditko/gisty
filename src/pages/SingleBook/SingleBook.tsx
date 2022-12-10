import { useParams } from 'react-router-dom';
import { auth } from '../../main';
import { InfinitySpin } from 'react-loader-spinner';
import styles from "./SingleBook.module.scss";
import { statuses } from '../../components/Popups/AddModal';
import { useTypedDispatch } from '../../hooks/useTypedDispatch';
import { setModal } from '../../slices/slice';
import { setDeleteId } from '../../slices/slice';
import classNames from 'classnames';
import useQuoteList from '../../hooks/useQuoteList';
import useBookItemById from '../../hooks/useBookItemById';

function SingleBook() {
	let { id } = useParams();
	const dispatch = useTypedDispatch();

	const {bookItem, bookItemLoading, bookItemError} = useBookItemById(id!)

	const {quotes} = useQuoteList()

	if (bookItemLoading || bookItemError || bookItem === undefined) {
		return (
			<div className={styles.books}>
				<InfinitySpin 
					width='200'
					color="#4fa94d"
					/>
			</div>
		)
	}

	return (
		<div className={styles.singleBookWrapper}>
			<div className={styles.singleBookAvatar}>
				<img className={styles.bookCover} src={bookItem.url} alt="book cover"/>
				<div className={styles.buttonWrapper}>
					<button
						className={classNames(styles.button, styles.addQuoteButton, styles.singleBookButton)}
						onClick={() => dispatch(setModal("add-quote"))}
						>
						Add a quote
					</button>
					<button
						className={classNames(styles.button, styles.addQuoteButton, styles.singleBookButton, styles.deleteQuoteButton)}
						onClick={() => {
							dispatch(setDeleteId(id!))
							dispatch(setModal("delete-book"))
						}}
						>
						Delete a book
					</button>
				</div>
			</div>
			<div className={styles.information}>
				<div className={styles.bookName}>
					{bookItem.title}
				</div>
				<div className={styles.bookStatus}><div className={styles.statusWrapper}>{statuses[bookItem.status]} {bookItem.status.toLowerCase()}</div></div>
				<div className={styles.bookDate}>
					Added on {new Date(bookItem.timestamp).toDateString().slice(3)} by <span>{auth?.currentUser?.displayName}</span>
				</div>
				{quotes.length === 0 ? "No related quotes" : (
					<div className={styles.relatedQuotes}>
						<div className={styles.relatedQuotesTitle}>Related quotes:</div>
						<ul>
							{quotes.map(item => {
								return <li className={styles.relatedQuote} key={item.id}>{item.quote}</li>
							})}
						</ul>
					</div>
				)}
			</div>
		</div>
	)
}

export default SingleBook