import { authSelector } from "../selectors/sectionSelector";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Book } from "../components/popups/Book";
import "./Books.scss";

const Books = () => {
	const [auth] = useSelector(authSelector); // ! change to firebase state

	return (
		// auth ? list.map((item, key) => item) : "Log in or register to access your data"
		<div className="page-wrapper">
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
			<Book/>
		</div>
	)
}

export default Books;