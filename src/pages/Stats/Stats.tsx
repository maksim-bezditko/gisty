import useBookList from "../../hooks/useBookList";
import { CircularProgressbar } from 'react-circular-progressbar';
import styles from "./Stats.module.scss"
import { FC } from "react";

const Stats: FC<{}> = () => {

	const {books, bookLoading, bookError} = useBookList();

	const goal = 15;

	const percentage = +(books.length / goal).toFixed(2) * 100;

	return (
		<div className={styles.wrapper}>
			<CircularProgressbar value={percentage} text={`${percentage}%`} />
		</div>
	);
}

export default Stats;