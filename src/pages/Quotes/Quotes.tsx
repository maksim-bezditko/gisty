import { useTypedDispatch } from "../../hooks/useTypedDispatch";
import Quote from "../../components/Quote/Quote";
import styles from "./Quotes.module.scss";
import { setModal } from "../../slices/slice";
import { useLayoutEffect } from "react";
import { setBooks } from "../../slices/slice";
import { Dna } from "react-loader-spinner";
import { sortListByDateDescending } from "../../utils/sortFunctions";
import { CSSTransition } from "react-transition-group";
import useBookList from "../../hooks/useBookList";
import useQuoteList from "../../hooks/useQuoteList";
import classNames from "classnames";

const Quotes = () => {	
	const dispatch = useTypedDispatch()

	const {books, bookLoading} = useBookList();
	const {quotes, quotesLoading, quotesError} = useQuoteList();

	useLayoutEffect(() => {
		dispatch(setBooks(books))
	}, [dispatch, books])

	if (quotesLoading || quotesError || bookLoading) {
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
		<div className={styles.quotes}>
			<div className={styles.buttonWrapper}>
				{ books.length === 0 && <p className={styles.warning}>In order to add a quote, add a book first</p>}
				{ books.length !== 0 && 
				<button
					className={classNames(styles.button, styles.addQuoteButton)}
					onClick={() => dispatch(setModal("add-quote"))}
					>
					Add a quote
				</button> }
			</div>
			{quotes.sort(sortListByDateDescending).map((item) => {
				return (
					<CSSTransition
						mountOnEnter
						unmountOnExit
						key={item.id}
						timeout={500}
						classNames="quote"
						in={true}
						appear={true}
				>
					<Quote book={item.book} id={item.id} timestamp={item.timestamp} quote={item.quote}/>
				</CSSTransition>
				)
			})}
		</div>
	)
}

export default Quotes;