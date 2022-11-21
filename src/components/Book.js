import "./Book.scss";
import { Link, Navigate } from "react-router-dom";

const statusCheck = {
	reading: "🟢",
	read: "✔️",
	planning: "⌛"
}

export const Book = ({id, title, link, date, status}) => {
	const [day, month, year] = date.split("-");
	console.log(day, month, year)

	const createdDate = new Date(+year, +month - 1, +day);
	console.log(createdDate)

	return (
		<>
			<Link to={`/books/${id}`} className="book-wrapper" onClick={<Navigate to={`/books/${id}`}/>}>
				<div className="image">
					<img src={link} alt="bookCover" className="bookCover"/>
				</div>

				<div className="info">
					<div className="title">{title}</div>

					<div className="additional">
						<div className="status">{statusCheck[status]} {status}</div>
						<div className="date">{createdDate.toDateString().slice(3)}</div>
					</div>
				</div>
			</Link>
		</>	
	)
}