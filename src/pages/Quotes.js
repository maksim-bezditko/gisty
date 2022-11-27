import { useDispatch } from "react-redux";
import Quote from "../components/Quote";
import "./Quotes.scss";
import { setModal } from "../slices/slice";
import sumIcon from "../assets/sum.svg";
import { useList } from "react-firebase-hooks/database";
import { auth, db } from "..";
import { ref } from "firebase/database";
import { useMemo, useContext, useLayoutEffect } from "react";
import { authContext } from "../components/App";
import { setBooks } from "../slices/slice";
import { Dna } from "react-loader-spinner";
import { sortListByDateDescending } from "../utils/sortFunctions";
import { CSSTransition } from "react-transition-group";

const Quotes = () => {
	const uid = auth.currentUser?.uid;	
	const [booksSnapshots, booksLoading, booksError] = useList(ref(db, `data/users/${uid}/books`));
	const [quotesSnapshots, quotesLoading, quotesError] = useList(ref(db, `data/users/${uid}/quotes`));
	const booksList = useMemo(() => {
		let arr = [];
		for (let i of booksSnapshots) {
			arr.push(i.val())
		}
		return arr

	}, [booksSnapshots]) 

	const quotesList = useMemo(() => {
		let arr = [];
		for (let i of quotesSnapshots) {
			arr.push(i.val())
		}
		return arr

	}, [quotesSnapshots]) 

	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(setBooks(booksList))
		console.log(booksList)
	}, [dispatch, booksList])

	if (quotesLoading || quotesError) {
		return (
			<div className="books">
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
		<div className="quotes">
			<div className="button-wrapper">
				<button
					className='button add-quote-button'
					onClick={() => dispatch(setModal("add-quote"))}
					>
					{/* <img className="sum-icon" src={sumIcon} alt="sumIcon"/> */}
					Add a quote
				</button>
			</div>
			{quotesList.sort(sortListByDateDescending).map((item) => {
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