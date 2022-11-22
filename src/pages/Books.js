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
import { useDispatch } from "react-redux";
import { setBooks } from "../slices/slice";

const Books = () => {
	const uid = auth.currentUser?.uid;	
	const [snapshots, loading, error] = useList(ref(db, `data/users/${uid}/books`));
	const list = useMemo(() => {
		let arr = [];
		for (let i of snapshots) {
			arr.push(i.val())
		}
		return arr

	}, [snapshots]) 
	
	const user = useContext(authContext);
	const dispatch = useDispatch()

	useLayoutEffect(() => {
		dispatch(setBooks(list))
		console.log(list)
	}, [dispatch, list])

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
		<div className="books">
				{list.length === 0 && user ? "No books yet" : null}
				{list.map((item) => {
					return <Book key={item.id} link={item.url} title={item.title} id={item.id} date={item.date} status={item.status}/>
				})}
		</div>
	)
}

export default Books;