import { authSelector } from "../selectors/sectionSelector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Book } from "../components/popups/Book";
import "./Books.scss";
import { ref, onValue } from "firebase/database";
import { db } from "..";
import { useState } from "react";
import { useEffect, useMemo} from "react";

const Books = () => {
	const [books, setBooks] = useState([])

	const booksRef = useMemo(() => ref(db, "data/books"), []);

	useEffect(() => {
		return onValue(booksRef, (snapshot) => {
			const data = snapshot.val();
			
			setBooks(data)
		});
	}, [booksRef])
	

	return (
		// auth ? list.map((item, key) => item) : "Log in or register to access your data"
		<div className="page-wrapper books">
			<div className="fit">
				{Object.values(books).map((item) => {
					return <Book key={item.id} link={item.url} title={item.title} id={item.id} date={item.date} status={item.status}/>
				})}
			</div>
		</div>
	)
}

export default Books;