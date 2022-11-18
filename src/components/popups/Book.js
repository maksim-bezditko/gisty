import "./Book.scss";
import bookCover1 from "../../assets/bookCover1.png";
import bookCover2 from "../../assets/bookCover.png";



export const Book = () => {
	return (
		<>
			<div className="book-wrapper">
				<div className="image">
					<div className="image-wrapper">
						<img src={bookCover2} alt="bookCover" className="bookCover"/>
					</div>
				</div>

				<div className="info">
					<div className="title">Alice in the Wonderland</div>

					<div className="additional">
						<div className="status">🟢 reading</div>
						<div className="date">12 Nov 2022</div>
					</div>
				</div>
			</div>
			<div className="book-wrapper">
				<div className="image">
				<div className="image-wrapper">
						<img src={bookCover1} alt="bookCover" className="bookCover"/>
					</div>
				</div>

				<div className="info">
					<div className="title">Alice in the Wonderland</div>

					<div className="additional">
						<div className="status">✔️ read</div>
						<div className="date">12 Nov 2022</div>
					</div>
				</div>
			</div>
		</>
		
	)
}