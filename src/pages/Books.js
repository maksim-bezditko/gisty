import { authSelector } from "../selectors/sectionSelector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Book } from "../components/Book";
import "./Books.scss";
import { ref, onValue } from "firebase/database";
import { db } from "..";
import { useState, useContext } from "react";
import { useEffect, useMemo} from "react";
import { auth } from "..";
import { useList } from "react-firebase-hooks/database";
import { authContext } from "../components/App";
import { Dna } from  'react-loader-spinner'


const Books = () => {
	const uid = auth.currentUser?.uid;
	const [snapshots, loading, error] = useList(ref(db, `data/users/${uid}/books`));
	const user = useContext(authContext);

	if (loading || error) {
		return (
			<div className="page-wrapper books">
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
		<div className="page-wrapper books">
			<div className="fit">
				{snapshots.length === 0 && user ? "No books yet" : null}
				{snapshots.map((item) => {
					item = item.val()
				
					return <Book key={item.id} link={item.url} title={item.title} id={item.id} date={item.date} status={item.status}/>
				})}
			</div>
		</div>
	)
}

export default Books;