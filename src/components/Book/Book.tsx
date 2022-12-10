import styles from "./Book.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { statuses } from "../Popups/AddModal";
import { FC } from "react";
import type { IStatuses } from "../../types" 

interface Props {
	id: string,
	title: string,
	link: string,
	timestamp: number,
	status: keyof IStatuses
}

export const Book: FC<Props> = ({id, title, link, timestamp, status}) => {
	const createdDate = new Date(timestamp);

	const navigate = useNavigate()

	const onClickHandler = () => {
		navigate(`/books/${id}`)
	}

	return (
		<>
			<Link to={`/books/${id}`} className={styles.bookWrapper} onClick={onClickHandler}>
				<div className={styles.image}>
					<img src={link} alt="bookCover" className={styles.bookCover}/>
				</div>

				<div className={styles.info}>
					<div className={styles.title}>{title}</div>

					<div className={styles.additional}>
						<div className={styles.status}>{statuses[status]} {status.toLowerCase()}</div>
						<div className={styles.date}>{createdDate.toDateString().slice(3)}</div>
					</div>
				</div>
			</Link>
		</>	
	)
}