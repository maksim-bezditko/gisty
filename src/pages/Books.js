import { authSelector } from "../selectors/sectionSelector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Book } from "../components/Book";
import "./Books.scss";
import { ref, onValue } from "firebase/database";
import { db } from "..";
import { useState } from "react";
import { useEffect, useMemo} from "react";
import { auth } from "..";

const Books = () => {
	const [books, setBooks] = useState([])
	const uid = auth.currentUser?.uid;
	const booksRef = useMemo(() => ref(db, `data/users/${uid}/books`), [uid]);

	useEffect(() => {
		return onValue(booksRef, (snapshot) => {
			const data = snapshot.val();
			if (data) setBooks(data)
			else setBooks([])
		});
	}, [booksRef])
	

	return (
		// auth ? list.map((item, key) => item) : "Log in or register to access your data"
		<div className="page-wrapper books">
			<div className="fit">
				{books.length === 0 && auth.currentUser ? "No books yet" : null}
				{Object.values(books).map((item) => {
					return <Book key={item.id} link={item.url} title={item.title} id={item.id} date={item.date} status={item.status}/>
				})}
			</div>
		</div>
	)
}

export default Books;