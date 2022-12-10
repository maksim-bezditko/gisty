import { Book } from "../../components/Book/Book";
import styles from "./Books.module.scss";
import { useLayoutEffect } from "react";
import { auth } from "../../main";
import { Dna } from  'react-loader-spinner'
import { useSelector } from "react-redux";
import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import { setBooks } from "../../slices/slice";
import { sortListByDateDescending } from "../../utils/sortFunctions";
import { booksSelector } from "../../selectors/selectors";
import useQuoteList from "../../hooks/useBookList";

const Books = () => {
	const dispatch = useTypedDispatch()
	
	const {books, bookLoading, bookError} = useQuoteList();
	const user = auth.currentUser
   const list: any[] = useSelector(booksSelector)
	
	useLayoutEffect(() => {
		dispatch(setBooks(books))
	}, [dispatch, books])

	if (bookLoading || bookError) {
		return (
			<div className={styles.books}>
				<Dna
					visible={true}
					height="100"
					width="100"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
					/>
			</div>
		)
	}
	
	return (
		<>	
			<div className={styles.books}>
					{list.length === 0 && user ? "No books yet" : null}
					{[...list].sort(sortListByDateDescending).map((item) => {
						return <Book key={item.id} link={item.url} title={item.title} id={item.id} timestamp={item.timestamp} status={item.status}/>
					})}
			</div>
		</>
	)
}

export default Books;