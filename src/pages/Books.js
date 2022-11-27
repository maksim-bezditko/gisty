import { Book } from "../components/Book";
import "./Books.scss";
import { ref, onValue } from "firebase/database";
import { db } from "..";
import { useState, useContext } from "react";
import { useLayoutEffect, useMemo} from "react";
import { auth } from "..";
import { useList } from "react-firebase-hooks/database";
import { authContext } from "../components/App";
import { Dna } from  'react-loader-spinner'
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../slices/slice";
import {sortListByDateAscending, sortListByDateDescending } from "../utils/sortFunctions";
import { booksSelector } from "../selectors/sectionSelector";

const Books = () => {
	const uid = auth.currentUser?.uid;	
	const [snapshots, loading, error] = useList(ref(db, `data/users/${uid}/books`));
	const books = useMemo(() => {
		let arr = [];
		for (let i of snapshots) {
			arr.push(i.val())
		}
		return arr

	}, [snapshots]) 
	
   const list = useSelector(booksSelector)
	const user = useContext(authContext);
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(setBooks(books))
	}, [dispatch, books])

	if (loading || error) {
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
		<>	
			{/* <div className="filters">
				<select defaultValue="desce" onChange={(e) => setSortBy(e.target.value)}>
					<option value="descending">Descending</option>
					<option value="ascending">Ascending</option>
				</select>
			</div> */}
			<div className="books">
					{list.length === 0 && user ? "No books yet" : null}
					{[...list].sort(sortListByDateDescending).map((item) => {  //
						return <Book key={item.id} link={item.url} title={item.title} id={item.id} timestamp={item.timestamp} status={item.status}/>
					})}
			</div>
		</>
	)
}

export default Books;